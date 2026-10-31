# VH-209 #1: failing focus items each side; V-48's record; targets of wrapped controls at the 32 px font; read-only from the records.
import json,glob,os,collections
def rec(side,groups=('open','f32','pages32','defa','defb','defc')):
    out={}
    for g in groups:
        for p in glob.glob(f'{side}-{g}/runs/vh209-*/*__*.json'):
            try: j=json.load(open(p))
            except: continue
            if 'instruments' not in j: continue
            out[(g,os.path.basename(p)[:-5])]=j
    return out
B,A=rec('before'),rec('after')
def fi(j): return [i for i in (j['instruments'].get('focus',{}).get('items') or []) if i.get('outcome')=='fail']
for name,S in (('before',B),('after',A)):
    c=collections.Counter(); ex={}
    for (g,k),j in S.items():
        for i in fi(j):
            mode=k.split('__')[3]; w=k.split('__')[2]; ke=(i['sel'],'f32' if 'font32' in mode else 'default',g=='open',w)
            c[ke]+=1; ex[ke]=(k,i.get('areaAt3to1'),i.get('perimeter2px'),i.get('controlPx'))
    print('FOCUS FAILS',name,sum(c.values()))
    for ke,n in sorted(c.items(),key=lambda x:str(x[0])): print('  ',n,ke,ex[ke])
for name,S in (('before',B),('after',A)):
    j=S.get(('f32','S-113__ms-MY__w320__font32')); 
    print('V-48',name, [ (i['sel'],i['outcome'],i.get('areaAt3to1'),i.get('perimeter2px'),i.get('controlPx')) for i in j['instruments']['focus']['items']] )
# targets failing items; type
for name,S in (('before',B),('after',A)):
    t=collections.Counter()
    for (g,k),j in S.items():
        for ins in ('targets','type','formatTip'):
            I=j['instruments'].get(ins,{})
            if I.get('outcome')=='fail':
                t[(ins,g,k.split('__')[0])]+=1
    print('OTHER FAILS',name,dict(t))
ex=A[('open','S-03__en-GB__w320__font32')]['instruments']
print(json.dumps({k:ex[k] for k in ('targets','type','formatTip')})[:800])
# heights of wrapped segments and buttons, after, S-113
