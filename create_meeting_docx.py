import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

doc = docx.Document()

# Set standard margins (2cm ~ 0.78 in)
sections = doc.sections
for section in sections:
    section.top_margin = Inches(0.8)
    section.bottom_margin = Inches(0.8)
    section.left_margin = Inches(0.9)
    section.right_margin = Inches(0.9)

# Colors
COLOR_PRIMARY = RGBColor(11, 60, 38)     # Deep Bottle Green #0B3C26
COLOR_SECONDARY = RGBColor(197, 160, 89) # Champagne Gold #C5A059
COLOR_DARK = RGBColor(40, 40, 40)       # Dark Gray
COLOR_MUTED = RGBColor(100, 100, 100)

def set_cell_background(cell, fill_color_hex):
    tcPr = cell._element.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_color_hex}"/>')
    tcPr.append(shd)

def add_heading_1(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(15)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_heading_2(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(12.5)
    run.font.bold = True
    run.font.color.rgb = COLOR_PRIMARY
    return p

def add_bullet(text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.2
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = 'Malgun Gothic'
        r_b.font.size = Pt(10)
        r_b.font.bold = True
        r_b.font.color.rgb = COLOR_DARK
    run = p.add_run(text)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(10)
    run.font.color.rgb = COLOR_DARK
    return p

def add_sub_bullet(text):
    p = doc.add_paragraph()
    p.paragraph_format.left_indent = Inches(0.4)
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(1)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run("▪ " + text)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(9.5)
    run.font.color.rgb = COLOR_DARK
    return p

def add_body_p(text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.2
    run = p.add_run(text)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(10)
    run.font.color.rgb = COLOR_DARK
    return p

# Document Title Banner Box
title_p = doc.add_paragraph()
title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
title_p.paragraph_format.space_before = Pt(10)
title_p.paragraph_format.space_after = Pt(15)
run_t = title_p.add_run("한국외식창업교육원 홈페이지 개발 회의록")
run_t.font.name = 'Malgun Gothic'
run_t.font.size = Pt(22)
run_t.font.bold = True
run_t.font.color.rgb = COLOR_PRIMARY

# Subtitle / Metadata Table
meta_table = doc.add_table(rows=4, cols=2)
meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
meta_data = [
    ("회의 목적", "홈페이지 시안 검토 및 운영·관리 기능 협의"),
    ("참석자", "이사장님, 교육원 관계자, 피터님(개발 담당) 등"),
    ("목표 일정", "2026년 10월 11일까지 완료"),
    ("참고사항", "녹취 일부의 인명·단체명이 부정확하게 인식되어 정확한 명칭 확인 필요"),
]
for i, (k, v) in enumerate(meta_data):
    row = meta_table.rows[i]
    cell_k, cell_v = row.cells[0], row.cells[1]
    cell_k.width = Inches(1.5)
    cell_v.width = Inches(5.2)
    
    set_cell_background(cell_k, "0B3C26")
    set_cell_background(cell_v, "F8F6F0")
    
    pk = cell_k.paragraphs[0]
    pk.alignment = WD_ALIGN_PARAGRAPH.CENTER
    rk = pk.add_run(k)
    rk.font.name = 'Malgun Gothic'
    rk.font.size = Pt(9.5)
    rk.font.bold = True
    rk.font.color.rgb = RGBColor(255, 255, 255)
    
    pv = cell_v.paragraphs[0]
    rv = pv.add_run(v)
    rv.font.name = 'Malgun Gothic'
    rv.font.size = Pt(9.5)
    rv.font.color.rgb = COLOR_DARK

doc.add_paragraph().paragraph_format.space_after = Pt(10)

# Section 2: 한눈에 보는 결론
add_heading_1("1. 한눈에 보는 결론")
add_bullet(" 홈페이지는 한국외식창업교육원의 교육 콘텐츠를 효과적으로 보여주고, 이용자를 유튜브 채널과 1:1 문의로 연결하는 방향으로 개발한다.")
add_bullet(" 초기에는 홈페이지 내 결제·유료 수강 시스템을 구축하지 않고 유튜브 영상 중심으로 운영한다.")
add_bullet(" 관리자가 과정·사진·게시물 등 주요 콘텐츠를 직접 수정할 수 있는 관리자 페이지를 제공한다.")
add_bullet(" 강남구 소상공인 관련 메뉴를 홈페이지에 추가하되, 교육원 콘텐츠와 혼동되지 않도록 별도 영역으로 구성한다.")
add_bullet(" 챗봇, AI 문의 답변, AI 블로그 등 운영 인력을 줄이는 기능은 단계적으로 검토한다.")

# Section 3: 핵심 논의사항
add_heading_1("2. 핵심 논의사항")

add_heading_2("가. 교육과정 및 패키지 구성")
add_bullet("현재는 패키지보다 단과 과정 중심으로 운영할 가능성이 높음.")
add_bullet("교육비 부담으로 인해 패키지 상품의 실제 판매 가능성은 추가 검토가 필요함.")
add_bullet("교육과정 페이지 구성 방안:")
add_sub_bullet("과정명 및 커리큘럼")
add_sub_bullet("교육 현장 및 활동사진 갤러리")
add_sub_bullet("유튜브 맛보기 영상")
add_sub_bullet("1:1 문의 연결")
add_sub_bullet("과정별 검색 및 상세 조회")
add_bullet("기존의 ‘수강 신청’ 버튼은 유튜브 채널 또는 1:1 문의로 연결되도록 변경하기로 함.")

add_heading_2("나. 교육생 모집 방식")
add_body_p("교육생 모집 방식으로 다음 두 가지 안이 제시됨:")
add_bullet("1안: 홈페이지 안에서 모집공고 생성 및 신청자 관리")
add_bullet("2안: 구글폼 신청 링크로 연결")
add_body_p("홈페이지 내 모집 기능도 계약 범위에서 구현 가능하다고 설명됐으나, 어느 방식을 사용할지는 내부 논의 후 결정하기로 함.")

add_heading_2("다. 관리자 페이지")
add_bullet("과정, 사진, 소개 문구, 게시물 등 주요 콘텐츠를 개발자에게 요청하지 않고 관리자가 직접 수정할 수 있도록 구성함.")
add_bullet("새 과정이나 행사 등록, 사진 교체, 공지사항 관리 등도 관리자 페이지에서 처리하는 것을 기본 방향으로 함.")
add_bullet("초기 콘텐츠는 교육원에서 자료를 전달하면 개발 담당자가 일괄 등록하는 방식으로 진행함.")
add_bullet("이후 지속적인 운영을 담당할 내부 관리자 지정이 필요함.")

add_heading_2("라. 문의 답변 및 챗봇")
add_bullet("방문자용 챗봇: 운영시간, 교육과정, 문의 방법 등을 안내하고 사용자를 원하는 페이지로 이동")
add_bullet("관리자용 AI 답변 도우미: 게시판 문의 내용을 읽어 답변 초안을 자동으로 작성")
add_bullet("중장년층 이용자를 고려해 자유 입력 방식보다는 다음 선택형 버튼을 제공:")
add_sub_bullet("어떤 교육과정이 있나요?")
add_sub_bullet("교육원 소개를 보고 싶어요.")
add_sub_bullet("명인·명장 정보를 보고 싶어요.")
add_sub_bullet("문의는 어떻게 하나요?")

add_heading_2("마. 메인 랜딩 페이지")
add_bullet("메인 화면은 스크롤을 내리며 콘텐츠를 확인하는 원스크롤 방식으로 구성함.")
add_bullet("교육원 소개, 인사말, 핵심 약속, 대표 프로필, 조직도 등을 순차적으로 배치함.")
add_bullet("명인·명장 시상식, 소상공인 행사 등 주요 소식을 관리자가 직접 교체할 수 있도록 함.")

add_heading_2("바. 강남구 소상공인 관련 메뉴")
add_bullet("교육원 콘텐츠와 섞이지 않도록 독립된 메뉴 또는 별도 랜딩 페이지 형태로 구성함.")
add_bullet("검토 내용: 강남구 소상공인 조직 소개, 회원 가입 혜택, 법률·세무·회계 지원 정보, 공지사항 및 관련 소식.")

add_heading_2("사. 외부 사이트 연계 및 교육원 소개 수정")
add_bullet("글로벌 외식정보 관련 신문·사이트 및 소상공인 공식 홈페이지 링크 마련.")
add_bullet("교육원 사무국의 ‘오시는 길’ 영역은 삭제 조치.")
add_bullet("‘명인 사업단’ 명칭을 ‘명인·명장 사업단’으로 변경.")
add_bullet("명인·명장별 상세 프로필 및 시상식 갤러리 구성.")

add_heading_2("아. 회원가입, 로그인 및 유튜브 연동")
add_bullet("카카오 계정 연동을 우선 검토 (사업자등록증 및 카카오비즈니스 채널 준비 필요).")
add_bullet("초기 강의 영상은 유튜브 업로드 후 임베드 방식으로 제공 (유료 강의 시스템은 추후 확장).")
add_bullet("AI 블로그 기능 적용 범위 검토.")

# Section 4: 결정사항
add_heading_1("3. 결정사항")
decisions = [
    "홈페이지는 교육원 콘텐츠 소개, 유튜브 유입, 1:1 문의 연결을 중심으로 개발한다.",
    "기존 수강 신청 기능은 유튜브 또는 1:1 문의 연결 방식으로 변경한다.",
    "주요 콘텐츠는 관리자 페이지에서 직접 추가·수정할 수 있도록 한다.",
    "교육원 사무국의 ‘오시는 길’ 영역은 삭제한다.",
    "‘명인 사업단’을 ‘명인·명장 사업단’으로 변경한다.",
    "명인·명장별 상세 프로필과 시상식 갤러리를 구성한다.",
    "강남구 소상공인 관련 메뉴를 별도 영역으로 추가한 시안을 제작한다.",
    "초기에는 유튜브 기반 무료 콘텐츠로 운영하고 유료 강의 시스템은 추후 확장한다.",
    "카카오 계정 연동을 우선 검토한다.",
]
for i, d in enumerate(decisions, 1):
    add_bullet(f"{i}. {d}")

# Section 5: 실행 업무 Table
add_heading_1("4. 실행 업무")

task_table = doc.add_table(rows=1, cols=5)
task_table.alignment = WD_TABLE_ALIGNMENT.CENTER
hdr_cells = task_table.rows[0].cells
hdr_titles = ["업무 내용", "담당자", "기한", "상태/근거", "비고"]
col_widths = [Inches(2.5), Inches(0.8), Inches(1.0), Inches(1.0), Inches(1.4)]

for i, title in enumerate(hdr_titles):
    hdr_cells[i].width = col_widths[i]
    set_cell_background(hdr_cells[i], "0B3C26")
    p = hdr_cells[i].paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(title)
    run.font.name = 'Malgun Gothic'
    run.font.size = Pt(9.5)
    run.font.bold = True
    run.font.color.rgb = RGBColor(255, 255, 255)

tasks_data = [
    ("회의 내용 반영 및 시안 제작", "피터님", "다음 미팅 전", "진행 예정", "강남구 소상공인 메뉴 포함"),
    ("수강 신청 버튼 ➔ 유튜브·1:1 문의 연결", "피터님", "즉시 완료", "완료", "과정별 1:1 문의/유튜브 연결"),
    ("관리자 페이지 적용 범위 확대", "피터님", "즉시 완료", "완료", "과정·사진·게시물·소개 콘텐츠"),
    ("강남구 소상공인 메뉴 시안 구성", "피터님", "즉시 완료", "완료", "독립 메뉴/소상공인 혜택·공지"),
    ("사무국 오시는 길 삭제", "피터님", "즉시 완료", "완료", "요청사항 반영"),
    ("명인 사업단 ➔ 명인·명장 사업단 변경", "피터님", "즉시 완료", "완료", "명칭 및 갤러리 반영"),
    ("방문자용 선택형 챗봇 모달 설계", "피터님", "즉시 완료", "완료", "선택형 4대 버튼 챗봇 구현"),
    ("강남구 소상공인 메뉴 구성안 전달", "교육원 측", "미정", "요청사항", "소개·혜택·공지·지원정보 등"),
    ("조직도 수정 명단 및 직책 전달", "교육원 측", "미정", "요청사항", "인명 표기 재확인 필요"),
    ("명인·명장 명단, 프로필, 사진 전달", "교육원 측", "미정", "요청사항", "상세 페이지 및 갤러리에 사용"),
    ("교육과정명·커리큘럼·사진 자료 전달", "교육원 측", "미정", "요청사항", "초기 콘텐츠 등록용"),
    ("글로벌 외식정보 및 관련 사이트 URL", "교육원 측", "미정", "요청사항", "로고와 정확한 명칭 포함"),
    ("사업자등록증 전달 (카카오 연동용)", "교육원 측", "미정", "요청사항", "대표자 카카오비즈니스 연동"),
]

for row_idx, task in enumerate(tasks_data):
    row_cells = task_table.add_row().cells
    bg_hex = "F8F6F0" if row_idx % 2 == 1 else "FFFFFF"
    for i, val in enumerate(task):
        row_cells[i].width = col_widths[i]
        set_cell_background(row_cells[i], bg_hex)
        p = row_cells[i].paragraphs[0]
        if i in [1, 2, 3]:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(val)
        run.font.name = 'Malgun Gothic'
        run.font.size = Pt(8.5)
        run.font.color.rgb = COLOR_DARK

doc.add_paragraph().paragraph_format.space_after = Pt(10)

# Section 6: 전달용 문구 Box
add_heading_1("5. 회의 후 전달용 문구")
box_p = doc.add_paragraph()
box_p.paragraph_format.space_before = Pt(6)
box_p.paragraph_format.space_after = Pt(6)

table_box = doc.add_table(rows=1, cols=1)
table_box.alignment = WD_TABLE_ALIGNMENT.CENTER
c = table_box.rows[0].cells[0]
c.width = Inches(6.7)
set_cell_background(c, "F2ECE0")
pb = c.paragraphs[0]
pb.paragraph_format.line_spacing = 1.3
rb = pb.add_run(
    "오늘 회의 내용 정리드립니다.\n\n"
    "홈페이지는 한국외식창업교육원의 교육 콘텐츠를 잘 보여주고, 이용자를 유튜브 채널과 1:1 문의로 연결하는 방향으로 구성하기로 했습니다. 과정·사진·게시물 등은 관리자 페이지에서 직접 수정할 수 있도록 개발할 예정입니다.\n\n"
    "강남구 소상공인 관련 내용은 교육원 콘텐츠와 혼동되지 않도록 별도 메뉴로 구성한 시안을 준비하겠습니다. 조직도 수정 내용, 교육과정 커리큘럼과 사진, 명인·명장 프로필, 관련 사이트 주소를 전달해 주시면 초기 콘텐츠도 함께 반영하겠습니다.\n\n"
    "모집 방식은 홈페이지 내 신청과 구글폼 연결 중 내부 논의 후 알려주시고, 카카오 연동을 위해 사업자등록증과 관련 계정도 추후 요청드리겠습니다. 다음 미팅에서는 수정 시안과 함께 챗봇, AI 문의 답변, AI 블로그 적용 범위를 다시 논의하겠습니다."
)
rb.font.name = 'Malgun Gothic'
rb.font.size = Pt(9.5)
rb.font.color.rgb = COLOR_PRIMARY

# Save
output_filename = "/Users/VIBRA_PETER/dev/KFSSEC/한국외식창업교육원_홈페이지_개발_회의록.docx"
doc.save(output_filename)
print("Successfully generated:", output_filename)
