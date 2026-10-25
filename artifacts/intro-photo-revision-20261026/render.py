import subprocess, pathlib, time
from PIL import Image, ImageOps, ImageFilter, ImageDraw, ImageFont
root=pathlib.Path(__file__).resolve().parents[2]
out=pathlib.Path('/tmp/kfssec-audit-20261026/video');out.mkdir(exist_ok=True)
source=root/'public/videos/kfssec-main-intro.mp4'
photos=[root/'public/images/gallery/ceremony/2024/img_6846.jpg',root/'public/images/gallery/ceremony/2024/img_6699.jpg',out/'portrait-wide.jpg']
frames=[129,97,120] # end at existing 11.533333 s keyframe
logo=pathlib.Path(__file__).resolve().parent/'assets/logo-alpha.png'
# Recreate the portrait composition and captions from source assets before rendering.
im=Image.open(root/'public/images/chairman_ahn_real.jpg').convert('RGB')
bg=ImageOps.fit(im,(1920,1080)).filter(ImageFilter.GaussianBlur(40))
p=ImageOps.contain(im,(1000,830));bg.paste(p,((1920-p.width)//2,0));bg.save(out/'portrait-wide.jpg')
font=ImageFont.truetype('/System/Library/Fonts/AppleSDGothicNeo.ttc',42,index=6)
lines=[('o1','불 조절 하나, 소스 한 숟갈까지 | 직접 해보며 배웁니다.'),('b1','사단법인 한국외식창업교육원입니다.'),('e1','외식 창업과 카페 창업, 메뉴 개발까지 | 이론부터 실습까지 단계별로 배우고,')]
for id,text in lines:
 c=Image.new('RGBA',(1920,1080));d=ImageDraw.Draw(c);y=865
 d.rounded_rectangle((290,840,1630,1005),radius=20,fill=(8,25,18,220))
 for part in text.split('|'):
  part=part.strip();box=d.textbbox((0,0),part,font=font);d.text(((1920-box[2])/2,y),part,font=font,fill='white');y+=56
 c.save(out/f'caption-{id}.png')

def run(args): subprocess.run(['ffmpeg','-y','-v','error',*map(str,args)],check=True)
start=time.monotonic()
for i,(photo,n) in enumerate(zip(photos,frames)):
 # Moderate, continuous photo motion; crop position keeps faces above subtitles.
 vf="scale=2400:1350:force_original_aspect_ratio=increase,crop=2400:1350,zoompan=z='1.02+0.00018*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1920x1080:fps=30,setsar=1,format=yuv420p"
 run(['-loop','1','-i',photo,'-vf',vf,'-frames:v',n,'-an','-c:v','libx264','-preset','fast','-crf','19','-video_track_timescale','15360',out/f'photo{i}.mp4'])
(out/'photos.txt').write_text(''.join(f"file '{out/f'photo{i}.mp4'}'\n" for i in range(3)))
run(['-f','concat','-safe','0','-i',out/'photos.txt','-c','copy',out/'photos.mp4'])
# Reuse exact source words and timings with a clean subtitle panel.
run(['-i',out/'photos.mp4','-i',logo,'-i',out/'caption-o1.png','-i',out/'caption-b1.png','-i',out/'caption-e1.png','-filter_complex',"[1:v]scale=230:-1[logo];[0:v]drawbox=x=35:y=30:w=260:h=170:color=white@0.92:t=fill[panel];[panel][logo]overlay=50:40[base];[base][2:v]overlay=enable='between(t,0.4,3.839854)'[c1];[c1][3:v]overlay=enable='between(t,4.290438,6.880626)'[c2];[c2][4:v]overlay=enable='gte(t,7.530626)',format=yuv420p[v]",'-map','[v]','-frames:v','346','-an','-c:v','libx264','-preset','fast','-crf','19','-video_track_timescale','15360',out/'head.mp4'])
run(['-ss','11.533333','-i',source,'-map','0:v:0','-c','copy','-an',out/'tail.mp4'])
(out/'join.txt').write_text(f"file '{out/'head.mp4'}'\nfile '{out/'tail.mp4'}'\n")
run(['-f','concat','-safe','0','-i',out/'join.txt','-i',source,'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',root/'public/videos/kfssec-main-intro-photo.mp4'])
print(f'Changed intro span rendered in {time.monotonic()-start:.1f} seconds; narration synthesis 0; existing audio copied.')
