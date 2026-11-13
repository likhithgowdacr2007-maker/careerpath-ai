"""Monthly refresh for listings.json (run by GitHub Actions, no admin needed).
1. Deletes listings whose last date has passed.
2. Deletes undated, non-recurring listings that were checked more than 60 days ago.
3. Adds open hackathons from Devpost (online or in India) and keeps the 10 soonest.
4. Optional: adds fresh India jobs from Adzuna (with salary and theme) when keys are set. Each job hides itself 30 days after posting.
Admin-added listings are never replaced, only removed when they expire."""
import json, os, re, datetime as dt, urllib.request, urllib.parse

TODAY = dt.date.today()
MON = {m: i for i, m in enumerate('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(), 1)}

def last_date(text):
    hits = re.findall(r'([A-Z][a-z]{2}) (\d{1,2})(?:, (\d{4}))?', text or '')
    if not hits or not hits[-1][2] or hits[-1][0] not in MON:
        return None
    m, d, y = hits[-1]
    try:
        return dt.date(int(y), MON[m], int(d))
    except ValueError:
        return None

def keep(x):
    if x.get('rec'):
        return True
    if x.get('e'):
        return dt.date.fromisoformat(x['e']) >= TODAY
    c = x.get('c', '')
    if re.fullmatch(r'\d{4}-\d{2}-\d{2}', c or ''):
        return (TODAY - dt.date.fromisoformat(c)).days <= 60
    return True

def devpost():
    out = []
    for page in (1, 2, 3):
        url = f'https://devpost.com/api/hackathons?status[]=upcoming&status[]=open&order_by=deadline&page={page}'
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = json.load(urllib.request.urlopen(req, timeout=30))
        except Exception as err:
            print('Devpost fetch failed, skipping:', err)
            break
        for h in data.get('hackathons', []):
            loc = (h.get('displayed_location') or {}).get('location', '')
            end = last_date(h.get('submission_period_dates', ''))
            link = h.get('url', '')
            if not (loc == 'Online' or 'India' in loc) or not end or end < TODAY or not link.startswith('https://'):
                continue
            prize = re.sub(r'<[^>]+>', '', str(h.get('prize_amount') or '')).strip()
            out.append({'k': 'h', 'ty': 'Hackathon', 't': h.get('title', 'Hackathon'), 'o': h.get('organization_name') or 'Listed on Devpost',
                        'd': 'Submissions close ' + end.strftime('%d %b %Y'), 'e': end.isoformat(), 'v': loc,
                        'f': ('Prizes: ' + prize) if prize else 'See official page', 'el': 'See official page',
                        'l': link, 'c': TODAY.isoformat(), 'auto': 1})
    return out

def guess_cat(title):
    t = title.lower()
    if re.search(r'data|machine learning|\bai\b|analytics|ml ', t): return 'Data & AI'
    if re.search(r'mechanical|civil|electrical|production|manufactur|quality|maintenance', t): return 'Core Engineering'
    if re.search(r'embedded|vlsi|electronics|firmware|hardware', t): return 'Electronics & Embedded'
    if re.search(r'pharma|biotech|biolog|chemist', t): return 'Pharma & Biotech'
    if re.search(r'support|bpo|voice|customer|process executive', t): return 'Customer Support & BPO'
    if re.search(r'software|developer|web|java|python|cloud|devops|tester|qa ', t): return 'IT & Software'
    return 'Mixed roles'

def adzuna():
    """Optional. Needs free keys from developer.adzuna.com saved as GitHub secrets
    ADZUNA_APP_ID and ADZUNA_APP_KEY. Without keys this step is skipped."""
    app_id, app_key = os.environ.get('ADZUNA_APP_ID'), os.environ.get('ADZUNA_APP_KEY')
    if not app_id or not app_key:
        print('Adzuna keys not set, skipping jobs feed')
        return []
    out, seen = [], set()
    for what in ('fresher software engineer', 'graduate engineer trainee', 'data analyst fresher', 'mechanical engineer fresher', 'electronics engineer fresher', 'engineering intern'):
        url = ('https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=%s&app_key=%s&results_per_page=10&sort_by=date&what=%s&content-type=application/json'
               % (app_id, app_key, urllib.parse.quote(what)))
        try:
            data = json.load(urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=30))
        except Exception as err:
            print('Adzuna fetch failed, skipping:', what, err)
            continue
        for j in data.get('results', []):
            link, title = j.get('redirect_url', ''), j.get('title', '')
            if not link.startswith('https://') or not title or link in seen:
                continue
            seen.add(link)
            try:
                posted = dt.date.fromisoformat((j.get('created') or '')[:10])
            except ValueError:
                posted = TODAY
            end = posted + dt.timedelta(days=30)
            if end < TODAY:
                continue
            lo, hi = j.get('salary_min'), j.get('salary_max')
            pay = 'Not stated'
            if lo:
                pay = 'Rs %.1f to %.1f lakh per year' % (lo / 1e5, (hi or lo) / 1e5)
                if str(j.get('salary_is_predicted')) == '1':
                    pay += ' (estimated by Adzuna)'
            out.append({'k': 'j', 'ty': 'Internship' if 'intern' in title.lower() else 'Job', 't': title,
                        'o': (j.get('company') or {}).get('display_name', 'Employer'),
                        'd': 'Posted ' + posted.isoformat() + '. Hides on ' + end.strftime('%d %b %Y'), 'e': end.isoformat(),
                        'v': (j.get('location') or {}).get('display_name', 'India'), 'f': pay,
                        'sl': round(lo / 1e5, 2) if lo else None, 'el': 'See listing', 'l': link,
                        'c': TODAY.isoformat(), 'auto': 1, 'src': 1, 'cat': guess_cat(title)})
    out.sort(key=lambda x: x['e'], reverse=True)
    return out[:40]

items = [x for x in json.load(open('listings.json', encoding='utf-8')) if keep(x) and not x.get('auto')]
seen = {x.get('l') for x in items}
fresh = [x for x in devpost() if x['l'] not in seen]
fresh.sort(key=lambda x: x['e'])
items += fresh[:10]
items += adzuna()
json.dump(items, open('listings.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{len(items)} listings saved ({len(fresh[:10])} auto-added)')
