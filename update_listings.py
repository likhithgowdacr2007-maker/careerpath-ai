"""Monthly refresh for listings.json (run by GitHub Actions, no admin needed).
1. Deletes listings whose last date has passed.
2. Deletes undated, non-recurring listings that were checked more than 60 days ago.
3. Adds open hackathons from Devpost (online or in India) and keeps the 10 soonest.
Admin-added listings are never replaced, only removed when they expire."""
import json, re, datetime as dt, urllib.request

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

items = [x for x in json.load(open('listings.json', encoding='utf-8')) if keep(x) and not x.get('auto')]
seen = {x.get('l') for x in items}
fresh = [x for x in devpost() if x['l'] not in seen]
fresh.sort(key=lambda x: x['e'])
items += fresh[:10]
json.dump(items, open('listings.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'{len(items)} listings saved ({len(fresh[:10])} auto-added)')
