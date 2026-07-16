"use client";

import { useEffect, useMemo, useState } from "react";
import { examQuestions, sectionMeta, type ExamQuestion, type ExamSection } from "./exam-data";

type Lesson = {
  id: string;
  label: string;
  episode: string;
  title: string;
  accent: string;
  scene: string;
  heroLine: string;
  mentorLine: string;
  definition: string;
  examples: string[];
  rule: string;
  question: string;
  choices: string[];
  correct: number;
  success: string;
  hint: string;
};

const lessons: Lesson[] = [
  {
    id: "asset",
    label: "資産",
    episode: "第1話",
    title: "店の“持ちもの”を探せ！",
    accent: "blue",
    scene: "OPEN前の店内",
    heroLine: "レジの現金も、あとで受け取る代金も、店を助けてくれそう！",
    mentorLine: "その通り。将来お金に変わる権利も、立派な資産だ。",
    definition: "資産＝会社が持つ財産や、将来お金を受け取れる権利",
    examples: ["現金", "売掛金", "備品"],
    rule: "資産が増えたら、あとで学ぶ“左側”に書く。",
    question: "商品を売り、代金は来月受け取る。増える資産は？",
    choices: ["売掛金", "買掛金", "売上"],
    correct: 0,
    success: "正解！「あとで受け取る権利」なので売掛金（資産）です。",
    hint: "“受け取る側”の権利を探してみよう。",
  },
  {
    id: "liability",
    label: "負債",
    episode: "第2話",
    title: "未来の支払いが迫る！",
    accent: "violet",
    scene: "仕入先から請求書",
    heroLine: "商品は届いたけど、お金は来月払う約束だった……！",
    mentorLine: "将来支払う義務。それが負債だ。怖がらず、約束として記録しよう。",
    definition: "負債＝将来、お金や物を渡さなければならない義務",
    examples: ["買掛金", "借入金", "未払金"],
    rule: "負債が増えたら“右側”に書く。",
    question: "商品を仕入れ、代金は来月払う。増える負債は？",
    choices: ["売掛金", "買掛金", "仕入"],
    correct: 1,
    success: "正解！「あとで代金を払う義務」は買掛金（負債）です。",
    hint: "“こちらが払う側”の約束です。",
  },
  {
    id: "equity",
    label: "純資産",
    episode: "第3話",
    title: "店の本当の持ち分とは？",
    accent: "yellow",
    scene: "店の金庫を整理中",
    heroLine: "持ちものから借金を引いたら、残りは誰のもの？",
    mentorLine: "それが店の正味の持ち分、純資産だ。会社の土台になる。",
    definition: "純資産＝資産から負債を引いた、返済不要の正味の持ち分",
    examples: ["資本金", "繰越利益剰余金"],
    rule: "資産 ＝ 負債 ＋ 純資産。この式は必ず左右で釣り合う。",
    question: "会社設立時、株主が現金10万円を出資した。増える純資産は？",
    choices: ["借入金", "資本金", "売上"],
    correct: 1,
    success: "正解！返済する借金ではなく、会社の元手となる資本金です。",
    hint: "出資は返済義務のない“会社の元手”です。",
  },
  {
    id: "revenue",
    label: "収益",
    episode: "第4話",
    title: "稼ぐ力が目を覚ます！",
    accent: "red",
    scene: "初めての商品販売",
    heroLine: "商品が売れた！ 店の成果が増えたってことだよね？",
    mentorLine: "そう。事業の成果によって純資産を増やす原因、それが収益だ。",
    definition: "収益＝商売の成果として、純資産を増やす原因",
    examples: ["売上", "受取利息", "受取手数料"],
    rule: "収益が増えたら“右側”に書く。",
    question: "商品を3万円で販売した。増える収益の勘定科目は？",
    choices: ["現金", "売上", "仕入"],
    correct: 1,
    success: "正解！現金は資産、販売による成果は売上（収益）です。",
    hint: "問われているのは、受け取った物ではなく“商売の成果”です。",
  },
  {
    id: "expense",
    label: "費用",
    episode: "第5話",
    title: "店を動かすコストの正体！",
    accent: "green",
    scene: "月末の支払い日",
    heroLine: "家賃も電気代も痛いけど、店を動かすには必要なんだ。",
    mentorLine: "成果を得るために使った価値は費用。純資産を減らす原因になる。",
    definition: "費用＝収益を得るために使われ、純資産を減らす原因",
    examples: ["仕入", "給料", "地代家賃"],
    rule: "費用が増えたら“左側”に書く。",
    question: "店舗の家賃5万円を支払った。増える費用は？",
    choices: ["支払家賃", "地代家賃", "未払金"],
    correct: 1,
    success: "正解！簿記では店舗や事務所の家賃を「地代家賃」で記録します。",
    hint: "簿記で土地・建物の賃借料を表す定番科目です。",
  },
  {
    id: "debit",
    label: "借方",
    episode: "第6話",
    title: "左の門・借方を開け！",
    accent: "blue",
    scene: "仕訳の修行場",
    heroLine: "“借りる”って意味じゃないの？ 名前に惑わされる！",
    mentorLine: "意味で考えなくていい。借方は仕訳の左側、と覚えれば十分だ。",
    definition: "借方（かりかた）＝仕訳の左側",
    examples: ["資産の増加", "費用の増加", "負債・純資産・収益の減少"],
    rule: "資産・費用は、増えたら左（借方）。",
    question: "現金が1万円増えた。現金は仕訳のどちら側？",
    choices: ["左の借方", "右の貸方", "どちらにも書かない"],
    correct: 0,
    success: "正解！現金は資産。資産の増加は左の借方です。",
    hint: "現金＝資産。資産が増える定位置を思い出そう。",
  },
  {
    id: "credit",
    label: "貸方",
    episode: "最終話",
    title: "右の門・貸方を攻略せよ！",
    accent: "red",
    scene: "仕訳の最終試練",
    heroLine: "左と右、2つに分ければ取引の全体像が見えるんだ！",
    mentorLine: "貸方は右側。左右の合計金額が一致すれば仕訳は完成だ。",
    definition: "貸方（かしかた）＝仕訳の右側",
    examples: ["負債の増加", "純資産の増加", "収益の増加", "資産・費用の減少"],
    rule: "負債・純資産・収益は、増えたら右（貸方）。",
    question: "銀行から5万円を借り、借入金が増えた。借入金はどちら側？",
    choices: ["左の借方", "右の貸方", "両方"],
    correct: 1,
    success: "正解！借入金は負債。負債の増加は右の貸方です。",
    hint: "借入金＝負債。負債が増える定位置は？",
  },
];

const finalQuestions = [
  {
    scene: "銀行から現金50,000円を借りた",
    choices: [
      "（借）借入金 50,000 ／（貸）現金 50,000",
      "（借）現金 50,000 ／（貸）借入金 50,000",
      "（借）現金 50,000 ／（貸）売上 50,000",
    ],
    correct: 1,
    explain: "現金（資産）の増加は借方、借入金（負債）の増加は貸方。",
  },
  {
    scene: "店舗の家賃10,000円を現金で支払った",
    choices: [
      "（借）地代家賃 10,000 ／（貸）現金 10,000",
      "（借）現金 10,000 ／（貸）地代家賃 10,000",
      "（借）買掛金 10,000 ／（貸）現金 10,000",
    ],
    correct: 0,
    explain: "地代家賃（費用）の増加は借方、現金（資産）の減少は貸方。",
  },
  {
    scene: "商品を現金30,000円で販売した",
    choices: [
      "（借）売上 30,000 ／（貸）現金 30,000",
      "（借）現金 30,000 ／（貸）売上 30,000",
      "（借）仕入 30,000 ／（貸）現金 30,000",
    ],
    correct: 1,
    explain: "現金（資産）の増加は借方、売上（収益）の増加は貸方。",
  },
  {
    scene: "備品80,000円を購入し、代金は来月払う",
    choices: [
      "（借）備品 80,000 ／（貸）未払金 80,000",
      "（借）未払金 80,000 ／（貸）備品 80,000",
      "（借）備品 80,000 ／（貸）売上 80,000",
    ],
    correct: 0,
    explain: "備品（資産）の増加は借方、後払いの未払金（負債）の増加は貸方。",
  },
  {
    scene: "株主が会社へ現金100,000円を出資した",
    choices: [
      "（借）資本金 100,000 ／（貸）現金 100,000",
      "（借）現金 100,000 ／（貸）借入金 100,000",
      "（借）現金 100,000 ／（貸）資本金 100,000",
    ],
    correct: 2,
    explain: "現金（資産）の増加は借方、資本金（純資産）の増加は貸方。",
  },
];

type SettlementLesson = {
  id: string;
  label: string;
  title: string;
  mission: string;
  heroLine: string;
  mentorLine: string;
  formula: string;
  points: string[];
  question: string;
  choices: string[];
  correct: number;
  success: string;
  hint: string;
};

const settlementLessons: SettlementLesson[] = [
  {
    id: "closing-map", label: "決算の地図", title: "まずは決算の順番をつかめ！", mission: "MISSION 01｜全体像",
    heroLine: "仕訳はできるのに、精算表になると急に迷子になる……。", mentorLine: "決算は一本道だ。どの数字を、なぜ直して、どこへ運ぶかを追えばいい。",
    formula: "整理前試算表 → 決算整理仕訳 → 精算表 → P/L・B/S", points: ["修正前の数字を読む", "当期分へ直す", "財務諸表へ運ぶ"],
    question: "決算手続きの基本的な順番として正しいものは？",
    choices: ["整理前試算表 → 決算整理仕訳 → 精算表 → 財務諸表", "財務諸表 → 整理前試算表 → 決算整理仕訳 → 精算表", "決算整理仕訳 → 財務諸表 → 整理前試算表 → 精算表"],
    correct: 0, success: "正解！元の残高を読み、整理仕訳で直し、精算表を経由して財務諸表へ運びます。", hint: "まず修正前の数字を確認し、最後に財務諸表を作ります。",
  },
  {
    id: "cost-of-sales", label: "売上原価", title: "売れた商品の原価だけを抜き出せ！", mission: "MISSION 02｜売上原価",
    heroLine: "仕入れた商品が全部売れたとは限らない。残った分はどうするの？", mentorLine: "期末商品を費用から外す。売れた分だけが、当期の売上原価だ。",
    formula: "期首商品棚卸高 ＋ 当期商品仕入高 − 期末商品棚卸高", points: ["期首商品は当期に売る候補", "仕入を足す", "売れ残りを引く"],
    question: "期首商品40,000円、当期仕入260,000円、期末商品60,000円。売上原価は？", choices: ["220,000円", "240,000円", "300,000円"],
    correct: 1, success: "正解！40,000＋260,000−60,000＝240,000円です。", hint: "期末に残った商品は、まだ売れていないので原価から引きます。",
  },
  {
    id: "allowance", label: "貸倒引当金", title: "回収できない未来を見積もれ！", mission: "MISSION 03｜貸倒引当金",
    heroLine: "売掛金は全部回収できるとは限らないんだよね？", mentorLine: "だから期末に必要額を見積もる。すでにある残高との差額だけを追加するんだ。",
    formula: "期末債権 × 設定率 − 貸倒引当金の既存残高 ＝ 繰入額", points: ["必要額を先に計算", "既存残高を確認", "差額だけ繰り入れる"],
    question: "売掛金200,000円、設定率2％、貸倒引当金の残高1,000円。繰入額は？", choices: ["1,000円", "3,000円", "4,000円"],
    correct: 1, success: "正解！必要額4,000円−既存残高1,000円＝繰入額3,000円です。", hint: "200,000円×2％で必要額を出してから、すでにある1,000円を引きます。",
  },
  {
    id: "depreciation", label: "減価償却", title: "備品の価値を期間へ配分せよ！", mission: "MISSION 04｜減価償却",
    heroLine: "高い備品を、買った年に全額費用にするわけじゃないんだ。", mentorLine: "使える年数に分けて費用化する。間接法では累計額を貸方へ置くぞ。",
    formula: "（取得原価 − 残存価額）÷ 耐用年数 ＝ 1年分の減価償却費", points: ["減価償却費は費用", "累計額は資産の控除", "月割りの有無を確認"],
    question: "取得原価240,000円、残存価額0円、耐用年数4年、定額法。1年分は？", choices: ["40,000円", "60,000円", "80,000円"],
    correct: 1, success: "正解！240,000÷4年＝60,000円。借方は減価償却費、貸方は減価償却累計額です。", hint: "今回は残存価額0円で、1年分を均等に配分します。",
  },
  {
    id: "accruals", label: "経過勘定", title: "時間をまたぐ費用を切り分けろ！", mission: "MISSION 05｜前払・未払",
    heroLine: "支払った金額と、今年の費用が同じとは限らないの？", mentorLine: "現金ではなく期間で考える。来期分は前払、当期の未払い分は未払だ。",
    formula: "支払額・受取額を、当期分と次期分に時間で分ける", points: ["前払費用＝資産", "未払費用＝負債", "月数を線で描く"],
    question: "8月1日に1年分の保険料24,000円を支払い、12月31日に決算。前払分は？", choices: ["10,000円", "12,000円", "14,000円"],
    correct: 2, success: "正解！当期分は8〜12月の5か月、次期分は7か月。24,000×7/12＝14,000円です。", hint: "1か月2,000円。決算日の翌月から残る月数を数えます。",
  },
  {
    id: "income-transfer", label: "損益振替", title: "第二問の損益勘定を攻略せよ！", mission: "MISSION 06｜勘定記入",
    heroLine: "収益と費用を締め切ったら、利益はどこへ行くの？", mentorLine: "まず損益勘定へ集める。利益なら最後に繰越利益剰余金へ振り替える。",
    formula: "収益 − 費用 ＝ 当期純利益 → 繰越利益剰余金へ振替", points: ["収益・費用を損益へ", "差額が利益または損失", "利益は純資産へ"],
    question: "売上500,000円、費用430,000円。利益を振り替える仕訳は？",
    choices: ["（借）繰越利益剰余金70,000 ／（貸）損益70,000", "（借）損益70,000 ／（貸）繰越利益剰余金70,000", "（借）現金70,000 ／（貸）売上70,000"],
    correct: 1, success: "正解！利益70,000円で損益勘定の貸方が大きいため、借方を損益、貸方を繰越利益剰余金にします。", hint: "利益は純資産を増やすので、繰越利益剰余金は貸方です。",
  },
  {
    id: "worksheet", label: "精算表", title: "修正後の数字をP/L・B/Sへ運べ！", mission: "MISSION 07｜第三問",
    heroLine: "整理仕訳はできた。でも精算表のどの列へ書くか迷う！", mentorLine: "費用・収益はP/L、資産・負債・純資産はB/S。最初の5分類へ戻れば解ける。",
    formula: "費用・収益 → 損益計算書 ／ 資産・負債・純資産 → 貸借対照表", points: ["修正記入欄は仕訳と同じ左右", "残高を合算", "5分類でP/L・B/Sへ"],
    question: "減価償却費と減価償却累計額の行き先は？", choices: ["両方とも損益計算書", "減価償却費はP/L、減価償却累計額はB/S", "減価償却費はB/S、減価償却累計額はP/L"],
    correct: 1, success: "正解！減価償却費は費用なのでP/L、減価償却累計額は資産の控除項目なのでB/Sです。", hint: "それぞれが費用なのか、資産に関係する項目なのかを判定します。",
  },
];

type IntermediateLesson = {
  id: string;
  label: string;
  title: string;
  mission: string;
  scene: string;
  rule: string;
  steps: string[];
  question: string;
  choices: string[];
  correct: number;
  success: string;
  hint: string;
};

const intermediateLessons: IntermediateLesson[] = [
  {
    id: "books", label: "補助簿", title: "取引を、正しい帳簿へ届けろ！", mission: "STAGE 01｜帳簿選択",
    scene: "掛けで商品を売った。仕訳帳だけでなく、どの補助簿にも記録する？",
    rule: "取引から『商品・掛け・現金』の要素を拾い、関係する補助簿をすべて選ぶ。",
    steps: ["商品売買か確認", "現金／掛けを判定", "人名勘定の有無を確認"],
    question: "得意先へ商品30,000円を掛けで売った。記入する補助簿の組合せは？",
    choices: ["売上帳と売掛金元帳", "仕入帳と買掛金元帳", "現金出納帳だけ"], correct: 0,
    success: "正解！掛け売上なので売上帳と、得意先別に管理する売掛金元帳へ記入します。",
    hint: "『売った』と『あとで受け取る』の2要素に分けます。",
  },
  {
    id: "vouchers", label: "伝票", title: "3伝票の空欄を復元せよ！", mission: "STAGE 02｜伝票会計",
    scene: "入金伝票・出金伝票は現金の増減が確定。空欄側を取引から逆算しよう。",
    rule: "入金伝票は（借）現金、出金伝票は（貸）現金。振替伝票は現金を使わない。",
    steps: ["伝票の種類を見る", "現金の左右を固定", "相手科目を逆算"],
    question: "売掛金20,000円を現金で回収した。使用する伝票と相手科目は？",
    choices: ["入金伝票・売掛金", "出金伝票・売掛金", "振替伝票・売上"], correct: 0,
    success: "正解！現金が入るので入金伝票。貸方の相手科目は売掛金です。",
    hint: "まず現金が増えたか減ったかだけを判断します。",
  },
  {
    id: "accounts", label: "勘定記入", title: "仕訳からT字勘定へ転記せよ！", mission: "STAGE 03｜勘定記入",
    scene: "仕訳の科目を探し、その科目と反対側にある科目名を摘要へ書く。",
    rule: "金額は仕訳と同じ側へ、相手科目名を摘要へ。日付も忘れず転記する。",
    steps: ["対象科目を探す", "同じ左右へ金額", "相手科目を摘要へ"],
    question: "（借）現金50,000／（貸）売上50,000。売上勘定の貸方摘要は？",
    choices: ["現金", "売上", "損益"], correct: 0,
    success: "正解！売上勘定の相手科目は現金なので、貸方摘要に『現金』と記入します。",
    hint: "対象科目ではなく、仕訳の反対側にある科目名を書きます。",
  },
  {
    id: "correction", label: "訂正仕訳", title: "誤った仕訳を、差額で直せ！", mission: "STAGE 04｜訂正",
    scene: "間違いを取り消してから正しい仕訳を入れる。まとめれば訂正仕訳になる。",
    rule: "誤仕訳の逆仕訳 ＋ 正しい仕訳。重なる科目は相殺して考える。",
    steps: ["誤仕訳を逆にする", "正しい仕訳を書く", "同科目を相殺"],
    question: "備品10,000円の現金購入を消耗品費と誤記した。訂正仕訳は？",
    choices: ["（借）備品10,000／（貸）消耗品費10,000", "（借）消耗品費10,000／（貸）備品10,000", "（借）備品10,000／（貸）現金10,000"], correct: 0,
    success: "正解！現金は両仕訳で同じため相殺され、費用から資産へ振り替えます。",
    hint: "すでに正しく記録されている現金は、訂正後も変わりません。",
  },
  {
    id: "closing-accounts", label: "締切り", title: "収益と費用を損益へ集めろ！", mission: "STAGE 05｜帳簿締切り",
    scene: "決算で収益・費用の残高をゼロにし、差額の利益を純資産へつなげる。",
    rule: "収益・費用 → 損益 → 繰越利益剰余金、の順に振り替える。",
    steps: ["収益を損益へ", "費用を損益へ", "利益を純資産へ"],
    question: "売上400,000円、費用合計330,000円。当期純利益の振替仕訳は？",
    choices: ["（借）損益70,000／（貸）繰越利益剰余金70,000", "（借）繰越利益剰余金70,000／（貸）損益70,000", "（借）現金70,000／（貸）売上70,000"], correct: 0,
    success: "正解！利益は純資産を増やすため、繰越利益剰余金を貸方へ記入します。",
    hint: "利益が出ると純資産は増加します。",
  },
];

const STORAGE_KEY = "boki-manga-quest-v1";
const SETTLEMENT_STORAGE_KEY = "boki-settlement-quest-v1";
const INTERMEDIATE_STORAGE_KEY = "boki-intermediate-quest-v1";

type Course = "home" | "beginner" | "intermediate" | "advanced" | "exam";

export default function Home() {
  const [course, setCourse] = useState<Course>("home");
  const [mode, setMode] = useState<"intro" | "lesson" | "final" | "result">("intro");
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [finalIndex, setFinalIndex] = useState(0);
  const [finalAnswers, setFinalAnswers] = useState<number[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
        if (saved) {
          setCompleted(Array.isArray(saved.completed) ? saved.completed : []);
          setCurrentLesson(Math.min(Number(saved.currentLesson) || 0, lessons.length - 1));
          setBestScore(Number(saved.bestScore) || 0);
          if (saved.completed?.length === lessons.length) setMode("final");
        }
      } catch {
        // A fresh start is safer than blocking the lesson when storage is unavailable.
      }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ completed, currentLesson, bestScore }),
    );
  }, [completed, currentLesson, bestScore, hydrated]);

  const lesson = lessons[currentLesson];
  const progress = Math.round((completed.length / lessons.length) * 100);
  const finalScore = useMemo(
    () => finalAnswers.reduce((sum, answer, index) => sum + (answer === finalQuestions[index].correct ? 1 : 0), 0),
    [finalAnswers],
  );

  function startLesson(index = Math.min(completed.length, lessons.length - 1)) {
    setCurrentLesson(index);
    setSelected(null);
    setSolved(false);
    setMode("lesson");
  }

  function answerLesson(index: number) {
    setSelected(index);
    if (index === lesson.correct) {
      setSolved(true);
      setCompleted((items) => (items.includes(lesson.id) ? items : [...items, lesson.id]));
    } else {
      setSolved(false);
    }
  }

  function nextLesson() {
    if (currentLesson < lessons.length - 1) {
      startLesson(currentLesson + 1);
    } else {
      setFinalIndex(0);
      setFinalAnswers([]);
      setSelected(null);
      setMode("final");
    }
  }

  function chooseFinal(index: number) {
    setSelected(index);
  }

  function nextFinal() {
    if (selected === null) return;
    const answers = [...finalAnswers, selected];
    setFinalAnswers(answers);
    setSelected(null);
    if (finalIndex < finalQuestions.length - 1) {
      setFinalIndex((value) => value + 1);
    } else {
      const score = answers.reduce(
        (sum, answer, index) => sum + (answer === finalQuestions[index].correct ? 1 : 0),
        0,
      );
      setBestScore((value) => Math.max(value, score));
      setMode("result");
    }
  }

  function restartFinal() {
    setFinalIndex(0);
    setFinalAnswers([]);
    setSelected(null);
    setMode("final");
  }

  function resetAll() {
    localStorage.removeItem(STORAGE_KEY);
    setCompleted([]);
    setCurrentLesson(0);
    setBestScore(0);
    setFinalAnswers([]);
    setSelected(null);
    setSolved(false);
    setMode("intro");
  }

  function openCourse(next: Course) {
    setCourse(next);
    requestAnimationFrame(() => document.getElementById("top")?.scrollIntoView({ behavior: "smooth" }));
  }

  return (
    <main>
      <header className="site-header">
        <button className="brand brand-button" onClick={() => openCourse("home")} aria-label="ボキコミ！学習ホームへ">
          <span className="brand-burst">B!</span>
          <span>ボキコミ！</span>
        </button>
        <nav className="level-tabs" aria-label="学習レベル">
          <button className={course === "beginner" ? "active" : ""} onClick={() => openCourse("beginner")}>初級</button>
          <button className={course === "intermediate" ? "active" : ""} onClick={() => openCourse("intermediate")}>中級</button>
          <button className={course === "advanced" ? "active" : ""} onClick={() => openCourse("advanced")}>上級</button>
          <button className={course === "exam" ? "active exam-tab" : "exam-tab"} onClick={() => openCourse("exam")}>演習</button>
        </nav>
        {course === "beginner" && <div className="header-progress" aria-label={`初級の学習進捗 ${progress}%`}>
          <span>{completed.length}/7 CLEAR</span>
          <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
        </div>}
      </header>

      {course === "home" && <CourseHome openCourse={openCourse} beginnerProgress={progress} bestScore={bestScore} />}

      {course === "beginner" && <>

      <section id="top" className={`hero ${mode !== "intro" ? "hero-compact" : ""}`}>
        <div className="speed-lines" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>簿記3級</span> 7 CONCEPTS QUEST</p>
          <h1>お金の動きを<br /><em>マンガで見破れ。</em></h1>
          <p className="hero-lead">資産から貸方まで、7つのルールを1話ずつ攻略。<br />読んで、選んで、仕訳がわかる。</p>
          {mode === "intro" && (
            <div className="hero-actions">
              <button className="primary-cta" onClick={() => startLesson()}>
                {completed.length ? "つづきから挑戦" : "第1話をはじめる"}<span>→</span>
              </button>
              <button className="secondary-cta secondary-button" onClick={() => openCourse("advanced")}>決算問題を特訓 <span>→</span></button>
            </div>
          )}
        </div>
        <div className="hero-comic" aria-label="主人公ミオとノート先生の会話">
          <div className="sfx">ドン!</div>
          <div className="character mentor" aria-hidden="true">
            <div className="glasses">● ●</div><div className="body-mark">帳</div>
          </div>
          <div className="character hero-person" aria-hidden="true">
            <div className="face">•ᴗ•</div><div className="body-mark">簿</div>
          </div>
          <div className="speech speech-one">簿記は<br /><b>左右の物語</b>だ！</div>
          <div className="speech speech-two">7話なら<br />いけそう！</div>
        </div>
      </section>

      {mode === "intro" && (
        <section className="intro-strip" aria-label="学習の流れ">
          <article><span>01</span><b>マンガを読む</b><small>約1分の会話で要点をつかむ</small></article>
          <article><span>02</span><b>3択で答える</b><small>その場で理由までわかる</small></article>
          <article><span>03</span><b>仕訳に挑む</b><small>最後は5問の実戦チャレンジ</small></article>
        </section>
      )}

      {mode !== "intro" && mode !== "result" && (
        <nav className="concept-nav" aria-label="7つの学習テーマ">
          {lessons.map((item, index) => {
            const isDone = completed.includes(item.id);
            const unlocked = index <= completed.length;
            return (
              <button
                key={item.id}
                className={`${index === currentLesson && mode === "lesson" ? "active" : ""} ${isDone ? "done" : ""}`}
                disabled={!unlocked || mode === "final"}
                onClick={() => startLesson(index)}
                aria-label={`${index + 1}. ${item.label}${isDone ? " クリア済み" : unlocked ? "" : " ロック中"}`}
              >
                <span>{isDone ? "✓" : index + 1}</span>{item.label}
              </button>
            );
          })}
        </nav>
      )}

      {mode === "lesson" && (
        <section className="lesson-shell" id="study">
          <div className="chapter-heading">
            <div><span>{lesson.episode}</span><small>{lesson.scene}</small></div>
            <h2>{lesson.title}</h2>
            <b>{String(currentLesson + 1).padStart(2, "0")} / 07</b>
          </div>

          <div className={`manga-grid accent-${lesson.accent}`}>
            <article className="manga-panel panel-a">
              <span className="panel-number">1</span>
              <div className="mini-character hero-mini" aria-hidden="true"><i>簿</i></div>
              <p className="bubble hero-bubble">{lesson.heroLine}</p>
              <strong className="sfx-small">ハッ</strong>
            </article>
            <article className="manga-panel panel-b">
              <span className="panel-number">2</span>
              <div className="mini-character mentor-mini" aria-hidden="true"><i>帳</i></div>
              <p className="bubble mentor-bubble">{lesson.mentorLine}</p>
            </article>
            <article className="manga-panel panel-c">
              <span className="panel-number">3</span>
              <p className="definition-label">CORE RULE</p>
              <h3>{lesson.label}</h3>
              <p className="definition">{lesson.definition}</p>
              <div className="tag-row">{lesson.examples.map((item) => <span key={item}>{item}</span>)}</div>
              <div className="rule-box">{lesson.rule}</div>
            </article>
          </div>

          <article className="quiz-card">
            <div className="quiz-title"><span>理解度チェック</span><b>Q</b></div>
            <h3>{lesson.question}</h3>
            <div className="choice-list">
              {lesson.choices.map((choice, index) => {
                const state = selected === index ? (index === lesson.correct ? "correct" : "wrong") : "";
                return (
                  <button key={choice} className={state} onClick={() => answerLesson(index)}>
                    <span>{String.fromCharCode(65 + index)}</span>{choice}
                    {selected === index && <i aria-hidden="true">{index === lesson.correct ? "○" : "×"}</i>}
                  </button>
                );
              })}
            </div>
            <div className={`feedback ${selected === null ? "idle" : solved ? "success" : "try"}`} aria-live="polite">
              <span>{selected === null ? "?" : solved ? "✓" : "!"}</span>
              <p>{selected === null ? "答えを選ぶと、ここに解説が表示されます。" : solved ? lesson.success : `もう一度！ ヒント：${lesson.hint}`}</p>
            </div>
            {solved && <button className="next-button" onClick={nextLesson}>{currentLesson === lessons.length - 1 ? "最終チャレンジへ" : "次の話へ"}<span>→</span></button>}
          </article>
        </section>
      )}

      {mode === "final" && (
        <section className="final-shell">
          <div className="final-title">
            <p>FINAL CHALLENGE</p>
            <h2>仕訳バトル <em>{finalIndex + 1}</em><span>/5</span></h2>
            <small>取引を「左の借方」と「右の貸方」に分解せよ。</small>
          </div>
          <div className="journal-reminder">
            <div><b>借方 ｜ 左</b><span>資産・費用が増える</span></div>
            <i>金額は左右一致</i>
            <div><b>貸方 ｜ 右</b><span>負債・純資産・収益が増える</span></div>
          </div>
          <article className="battle-card">
            <div className="battle-scene"><span>取引</span><h3>{finalQuestions[finalIndex].scene}</h3></div>
            <div className="choice-list journal-choices">
              {finalQuestions[finalIndex].choices.map((choice, index) => (
                <button key={choice} className={selected === index ? "selected" : ""} onClick={() => chooseFinal(index)}>
                  <span>{String.fromCharCode(65 + index)}</span>{choice}
                </button>
              ))}
            </div>
            <button className="next-button" disabled={selected === null} onClick={nextFinal}>
              {finalIndex === finalQuestions.length - 1 ? "採点する" : "回答して次へ"}<span>→</span>
            </button>
          </article>
        </section>
      )}

      {mode === "result" && (
        <section className="result-shell">
          <div className="result-burst" aria-hidden="true">CLEAR!</div>
          <p>仕訳バトル 結果</p>
          <h2><strong>{finalScore}</strong><span>/ 5問</span></h2>
          <h3>{finalScore === 5 ? "完全攻略！仕訳の型が見えています。" : finalScore >= 3 ? "合格圏！間違えた取引だけ復習しよう。" : "ここから伸びる！7話を見返せば大丈夫。"}</h3>
          <p className="result-note">ベストスコア：{Math.max(bestScore, finalScore)} / 5</p>
          <div className="answer-review">
            {finalQuestions.map((question, index) => {
              const correct = finalAnswers[index] === question.correct;
              return (
                <details key={question.scene}>
                  <summary><span className={correct ? "ok" : "ng"}>{correct ? "○" : "×"}</span>{question.scene}</summary>
                  <p>{question.explain}</p>
                </details>
              );
            })}
          </div>
          <div className="result-actions">
            <button className="primary-cta" onClick={restartFinal}>もう一度挑戦 <span>↻</span></button>
            <button className="text-button" onClick={() => startLesson(0)}>第1話から復習</button>
          </div>
        </section>
      )}

      <section className="cheat-sheet">
        <div>
          <p>SAVE THIS RULE</p>
          <h2>増えたら、どっち？</h2>
        </div>
        <article className="debit-card"><span>借方</span><b>左</b><p>資産・費用</p></article>
        <article className="credit-card"><span>貸方</span><b>右</b><p>負債・純資産・収益</p></article>
      </section>

      </>}

      {course === "intermediate" && <IntermediateCourse onNext={() => openCourse("advanced")} />}
      {course === "advanced" && <SettlementCourse />}
      {course === "exam" && <ExamCourse />}

      <footer>
        <p><b>ボキコミ！</b> 漫画でわかる簿記3級</p>
        {course === "beginner" && <button onClick={resetAll}>初級の学習データをリセット</button>}
        {course !== "beginner" && <button onClick={() => openCourse("home")}>学習ホームへ戻る</button>}
      </footer>
    </main>
  );
}

function CourseHome({ openCourse, beginnerProgress, bestScore }: { openCourse: (course: Course) => void; beginnerProgress: number; bestScore: number }) {
  return (
    <div id="top" className="course-home">
      <section className="portal-hero">
        <div className="speed-lines" aria-hidden="true" />
        <div>
          <p className="eyebrow"><span>簿記3級</span> COMPLETE LEARNING QUEST</p>
          <h1>わかるから、<br /><em>解ける</em>まで。</h1>
          <p>基礎の5分類から、第2問の帳簿、第3問の決算まで。<br />苦手なレベルを選び、ひとつのアプリで段階的に攻略しよう。</p>
        </div>
        <div className="portal-stamp" aria-label="全3コース、全19ミッション">
          <span>ALL IN ONE</span><b>3</b><strong>COURSES</strong><small>19 MISSIONS</small>
        </div>
      </section>

      <section className="level-map" aria-labelledby="level-map-title">
        <div className="level-map-heading">
          <p>SELECT YOUR LEVEL</p><h2 id="level-map-title">どこから始める？</h2>
          <span>順番どおりでも、苦手なところからでもOK</span>
        </div>
        <div className="level-cards">
          <article className="level-card beginner-card">
            <div className="level-number">01</div><span className="level-badge">初級｜基本を固める</span>
            <h3>仕訳の<br />土台編</h3>
            <p>資産・負債・純資産・収益・費用と、借方・貸方をマンガで理解。</p>
            <ul><li>7つの基本概念</li><li>仕訳バトル 5問</li><li>進捗・最高点を保存</li></ul>
            <div className="card-progress"><span>現在の進捗</span><b>{beginnerProgress}%</b><i><em style={{ width: `${beginnerProgress}%` }} /></i></div>
            <button onClick={() => openCourse("beginner")}>{beginnerProgress ? "つづきから" : "初級を始める"}<span>→</span></button>
            {bestScore > 0 && <small>仕訳バトル最高 {bestScore}/5</small>}
          </article>
          <article className="level-card intermediate-card">
            <div className="level-number">02</div><span className="level-badge">中級｜第2問を攻略</span>
            <h3>帳簿と<br />転記編</h3>
            <p>補助簿・伝票・勘定記入を「どこからどこへ」で整理し、空欄補充に強くなる。</p>
            <ul><li>補助簿の選択</li><li>3伝票と勘定記入</li><li>訂正・締切り仕訳</li></ul>
            <div className="route-note">5 STAGES <span>第2問対策</span></div>
            <button onClick={() => openCourse("intermediate")}>中級を始める<span>→</span></button>
          </article>
          <article className="level-card advanced-card">
            <div className="level-number">03</div><span className="level-badge">上級｜第3問を攻略</span>
            <h3>決算の<br />総合編</h3>
            <p>整理前試算表から決算整理仕訳、精算表、P/L・B/Sまで一本につなげる。</p>
            <ul><li>売上原価・引当金</li><li>減価償却・経過勘定</li><li>ミニ第3問</li></ul>
            <div className="route-note">7 MISSIONS <span>決算特化</span></div>
            <button onClick={() => openCourse("advanced")}>上級を始める<span>→</span></button>
          </article>
        </div>
        <article className="exam-launch-card">
          <div className="exam-launch-copy">
            <span className="level-badge">NEW｜スマホ完結</span>
            <p>EXAM PRACTICE</p>
            <h3>本試験形式の問題を、<br /><em>何度でも。</em></h3>
            <p>仕訳・帳簿・決算の全45問から出題。60分模試、分野別演習、見直し、誤答復習までひとつの画面で完結します。</p>
          </div>
          <div className="exam-launch-stats" aria-label="演習モードの内容">
            <div><b>45</b><span>QUESTIONS</span></div>
            <div><b>60</b><span>MINUTES</span></div>
            <div><b>70</b><span>% TO PASS</span></div>
          </div>
          <button onClick={() => openCourse("exam")}>過去問スタイル演習へ<span>→</span></button>
          <small>※日本商工会議所の問題転載ではなく、出題形式に合わせたオリジナル問題です。</small>
        </article>
      </section>
    </div>
  );
}

function IntermediateCourse({ onNext }: { onNext: () => void }) {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const lesson = intermediateLessons[current];

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(localStorage.getItem(INTERMEDIATE_STORAGE_KEY) ?? "null");
        if (saved) {
          setCompleted(Array.isArray(saved.completed) ? saved.completed : []);
          setCurrent(Math.min(Number(saved.current) || 0, intermediateLessons.length - 1));
        }
      } catch { /* A fresh course remains usable without storage. */ }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(INTERMEDIATE_STORAGE_KEY, JSON.stringify({ completed, current }));
  }, [completed, current, hydrated]);

  function openLesson(index: number) {
    setCurrent(index); setSelected(null); setSolved(false);
    requestAnimationFrame(() => document.getElementById("intermediate-study")?.scrollIntoView({ behavior: "smooth" }));
  }

  function answer(index: number) {
    setSelected(index);
    const isCorrect = index === lesson.correct;
    setSolved(isCorrect);
    if (isCorrect) setCompleted((items) => items.includes(lesson.id) ? items : [...items, lesson.id]);
  }

  function next() {
    if (current < intermediateLessons.length - 1) openLesson(current + 1);
  }

  function reset() {
    localStorage.removeItem(INTERMEDIATE_STORAGE_KEY);
    setCurrent(0); setCompleted([]); setSelected(null); setSolved(false);
  }

  const progress = Math.round((completed.length / intermediateLessons.length) * 100);

  return (
    <section id="top" className="intermediate-course">
      <div className="course-band">
        <div>
          <p><span>中級</span> QUESTION 2 QUEST</p>
          <h1>帳簿は、<br /><em>道順</em>で解く。</h1>
          <p className="course-band-lead">第2問で迷うのは、知識がないからではなく「どこからどこへ」が見えないから。<br />5つのステージで、取引から帳簿までの流れをつなげよう。</p>
        </div>
        <div className="ledger-route" aria-label="取引から帳簿への流れ">
          <div><span>取引</span><b>何が起きた？</b></div><i>→</i><div><span>仕訳</span><b>左右に分ける</b></div><i>→</i><div><span>帳簿</span><b>正しく転記</b></div>
        </div>
      </div>

      <div className="intermediate-body" id="intermediate-study">
        <div className="course-progress"><b>{completed.length}</b><span>/ 5 STAGES</span><div><i style={{ width: `${progress}%` }} /></div></div>
        <nav className="stage-nav" aria-label="中級のステージ">
          {intermediateLessons.map((item, index) => {
            const done = completed.includes(item.id); const unlocked = index <= completed.length;
            return <button key={item.id} disabled={!unlocked} className={`${index === current ? "active" : ""} ${done ? "done" : ""}`} onClick={() => openLesson(index)}><span>{done ? "✓" : index + 1}</span>{item.label}</button>;
          })}
        </nav>

        <article className="route-lesson">
          <div className="route-heading"><div><span>{lesson.mission}</span><h2>{lesson.title}</h2></div><b>{String(current + 1).padStart(2, "0")} / 05</b></div>
          <div className="route-comic">
            <div className="route-scene"><span>CASE</span><p>{lesson.scene}</p><strong>どこへ<br />運ぶ？</strong></div>
            <div className="route-rule"><span>ROUTE RULE</span><h3>{lesson.rule}</h3><ol>{lesson.steps.map((step, index) => <li key={step}><b>{index + 1}</b>{step}</li>)}</ol></div>
          </div>
          <div className="route-quiz">
            <div className="quiz-title"><span>第2問チェック</span><b>Q</b></div><h3>{lesson.question}</h3>
            <div className="choice-list">{lesson.choices.map((choice, index) => {
              const state = selected === index ? (index === lesson.correct ? "correct" : "wrong") : "";
              return <button key={choice} className={state} onClick={() => answer(index)}><span>{String.fromCharCode(65 + index)}</span>{choice}{selected === index && <i>{index === lesson.correct ? "○" : "×"}</i>}</button>;
            })}</div>
            <div className={`feedback ${selected === null ? "idle" : solved ? "success" : "try"}`} aria-live="polite"><span>{selected === null ? "?" : solved ? "✓" : "!"}</span><p>{selected === null ? "取引から帳簿までの道順を思い浮かべよう。" : solved ? lesson.success : `ヒント：${lesson.hint}`}</p></div>
            {solved && current < 4 && <button className="next-button" onClick={next}>次のステージへ<span>→</span></button>}
            {solved && current === 4 && <button className="next-button advanced-next" onClick={onNext}>上級・決算編へ<span>→</span></button>}
          </div>
        </article>
        <button className="course-reset" onClick={reset}>中級の進捗をリセット</button>
      </div>
    </section>
  );
}

function SettlementCourse() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [finalChoice, setFinalChoice] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const lesson = settlementLessons[current];

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(localStorage.getItem(SETTLEMENT_STORAGE_KEY) ?? "null");
        if (saved) {
          setCompleted(Array.isArray(saved.completed) ? saved.completed : []);
          setCurrent(Math.min(Number(saved.current) || 0, settlementLessons.length - 1));
        }
      } catch {
        // Start fresh when browser storage is unavailable.
      }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SETTLEMENT_STORAGE_KEY, JSON.stringify({ completed, current }));
  }, [completed, current, hydrated]);

  function openLesson(index: number) {
    setCurrent(index);
    setSelected(null);
    setSolved(false);
  }

  function answer(index: number) {
    setSelected(index);
    if (index === lesson.correct) {
      setSolved(true);
      setCompleted((items) => items.includes(lesson.id) ? items : [...items, lesson.id]);
    } else {
      setSolved(false);
    }
  }

  function next() {
    if (current < settlementLessons.length - 1) {
      openLesson(current + 1);
      document.getElementById("settlement")?.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById("settlement-final")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function reset() {
    localStorage.removeItem(SETTLEMENT_STORAGE_KEY);
    setCurrent(0);
    setCompleted([]);
    setSelected(null);
    setSolved(false);
    setFinalChoice(null);
  }

  const closingProgress = Math.round((completed.length / settlementLessons.length) * 100);

  return (
    <section className="settlement-section" id="settlement">
      <div className="settlement-hero">
        <div>
          <p><span>第2問・第3問対策</span> CLOSING QUEST</p>
          <h2>決算を、一本の<br /><em>ストーリー</em>にする。</h2>
          <p className="settlement-lead">数字を直す理由がわかれば、精算表はただの転記になる。<br />7つのミッションで決算の流れをつなげよう。</p>
        </div>
        <div className="closing-map" aria-label="決算の流れ">
          <div><span>01</span><b>整理前<br />試算表</b></div><i>→</i>
          <div><span>02</span><b>決算整理<br />仕訳</b></div><i>→</i>
          <div><span>03</span><b>精算表</b></div><i>→</i>
          <div><span>04</span><b>P/L・B/S</b></div>
        </div>
      </div>

      <div className="settlement-progress" aria-label={`決算攻略編の進捗 ${closingProgress}%`}>
        <div><b>{completed.length}</b><span>/ 7 MISSIONS</span></div>
        <div className="closing-progress-track"><i style={{ width: `${closingProgress}%` }} /></div>
      </div>

      <nav className="settlement-nav" aria-label="決算攻略編のミッション">
        {settlementLessons.map((item, index) => {
          const done = completed.includes(item.id);
          const unlocked = index <= completed.length;
          return (
            <button key={item.id} className={`${current === index ? "active" : ""} ${done ? "done" : ""}`} disabled={!unlocked} onClick={() => openLesson(index)}>
              <span>{done ? "✓" : index + 1}</span>{item.label}
            </button>
          );
        })}
      </nav>

      <article className="settlement-card">
        <div className="settlement-heading">
          <div><span>{lesson.mission}</span><h3>{lesson.title}</h3></div>
          <b>{String(current + 1).padStart(2, "0")} / 07</b>
        </div>

        <div className="closing-comic">
          <div className="closing-panel rookie-panel">
            <div className="closing-face" aria-hidden="true">•︵•<i>簿</i></div>
            <p>{lesson.heroLine}</p>
          </div>
          <div className="closing-panel teacher-panel">
            <div className="closing-face" aria-hidden="true">●‿●<i>帳</i></div>
            <p>{lesson.mentorLine}</p>
          </div>
          <div className="closing-rule">
            <span>DECISION RULE</span>
            <strong>{lesson.formula}</strong>
            <ul>{lesson.points.map((point) => <li key={point}>{point}</li>)}</ul>
          </div>
        </div>

        <div className="settlement-quiz">
          <div className="quiz-title"><span>決算チェック</span><b>Q</b></div>
          <h3>{lesson.question}</h3>
          <div className="choice-list">
            {lesson.choices.map((choice, index) => {
              const state = selected === index ? (index === lesson.correct ? "correct" : "wrong") : "";
              return (
                <button key={choice} className={state} onClick={() => answer(index)}>
                  <span>{String.fromCharCode(65 + index)}</span>{choice}
                  {selected === index && <i aria-hidden="true">{index === lesson.correct ? "○" : "×"}</i>}
                </button>
              );
            })}
          </div>
          <div className={`feedback ${selected === null ? "idle" : solved ? "success" : "try"}`} aria-live="polite">
            <span>{selected === null ? "?" : solved ? "✓" : "!"}</span>
            <p>{selected === null ? "計算過程を紙に書いてから答えを選ぼう。" : solved ? lesson.success : `ヒント：${lesson.hint}`}</p>
          </div>
          {solved && <button className="next-button" onClick={next}>{current === 6 ? "総合問題へ" : "次のミッションへ"}<span>→</span></button>}
        </div>
      </article>

      <article className={`settlement-final ${completed.length < 7 ? "locked" : ""}`} id="settlement-final">
        <div className="final-lock">{completed.length < 7 ? "LOCKED｜7ミッションクリアで解放" : "FINAL｜ミニ第3問"}</div>
        <h3>決算整理後の当期純利益を求めよ</h3>
        <div className="mini-worksheet">
          <div><span>売上</span><b>500,000円</b></div>
          <div><span>期首商品</span><b>50,000円</b></div>
          <div><span>当期仕入</span><b>300,000円</b></div>
          <div><span>期末商品</span><b>70,000円</b></div>
          <div><span>支払家賃</span><b>120,000円</b><small>うち次期分20,000円</small></div>
          <div><span>減価償却費</span><b>60,000円</b></div>
          <div><span>法人税等</span><b>20,000円</b></div>
        </div>
        <div className="choice-list final-closing-choices">
          {["20,000円", "40,000円", "60,000円"].map((choice, index) => (
            <button key={choice} disabled={completed.length < 7} className={finalChoice === index ? (index === 1 ? "correct" : "wrong") : ""} onClick={() => setFinalChoice(index)}>
              <span>{String.fromCharCode(65 + index)}</span>{choice}
              {finalChoice === index && <i aria-hidden="true">{index === 1 ? "○" : "×"}</i>}
            </button>
          ))}
        </div>
        {finalChoice !== null && (
          <div className={`final-closing-answer ${finalChoice === 1 ? "success" : "try"}`} aria-live="polite">
            <b>{finalChoice === 1 ? "完全正解！" : "もう一度、売上原価から計算しよう。"}</b>
            <p>売上原価 50,000＋300,000−70,000＝280,000円。家賃は当期分100,000円。500,000−280,000−100,000−60,000−20,000＝<strong>40,000円</strong>です。</p>
          </div>
        )}
      </article>

      <button className="settlement-reset" onClick={reset}>決算攻略編の進捗をリセット</button>
    </section>
  );
}

type ExamView = "menu" | "session" | "result";
type ExamKind = "mock" | "quick" | "section1" | "section2" | "section3" | "mistakes";
type ExamAnswers = Record<string, number>;

const EXAM_STORAGE_KEY = "boki-exam-practice-v1";

function shuffleQuestions(items: ExamQuestion[]) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}

function formatTime(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

function ExamCourse() {
  const [view, setView] = useState<ExamView>("menu");
  const [kind, setKind] = useState<ExamKind>("quick");
  const [sessionIds, setSessionIds] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<ExamAnswers>({});
  const [marked, setMarked] = useState<string[]>([]);
  const [mistakeIds, setMistakeIds] = useState<string[]>([]);
  const [bestScore, setBestScore] = useState(0);
  const [endAt, setEndAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const session = useMemo(
    () => sessionIds.map((id) => examQuestions.find((item) => item.id === id)).filter((item): item is ExamQuestion => Boolean(item)),
    [sessionIds],
  );
  const question = session[current];

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = JSON.parse(localStorage.getItem(EXAM_STORAGE_KEY) ?? "null");
        if (saved) {
          const validIds = Array.isArray(saved.sessionIds) ? saved.sessionIds.filter((id: string) => examQuestions.some((item) => item.id === id)) : [];
          setMistakeIds(Array.isArray(saved.mistakeIds) ? saved.mistakeIds : []);
          setBestScore(Number(saved.bestScore) || 0);
          if (saved.view === "session" && validIds.length) {
            setView("session"); setKind(saved.kind || "quick"); setSessionIds(validIds);
            setCurrent(Math.min(Number(saved.current) || 0, validIds.length - 1));
            setAnswers(saved.answers && typeof saved.answers === "object" ? saved.answers : {});
            setMarked(Array.isArray(saved.marked) ? saved.marked : []);
            setEndAt(Number(saved.endAt) || null);
          }
        }
      } catch { /* Storage is an enhancement; the question bank remains usable without it. */ }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify({ view, kind, sessionIds, current, answers, marked, mistakeIds, bestScore, endAt }));
  }, [view, kind, sessionIds, current, answers, marked, mistakeIds, bestScore, endAt, hydrated]);

  useEffect(() => {
    if (view !== "session" || !endAt) return;
    const update = () => {
      const next = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setSecondsLeft(next);
      if (next === 0) setView("result");
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [view, endAt]);

  const score = useMemo(() => {
    if (!session.length) return 0;
    const correct = session.filter((item) => answers[item.id] === item.correct).length;
    return Math.round((correct / session.length) * 100);
  }, [session, answers]);

  const correctCount = session.filter((item) => answers[item.id] === item.correct).length;
  const answeredCount = session.filter((item) => answers[item.id] !== undefined).length;

  function startSession(nextKind: ExamKind) {
    let selected: ExamQuestion[] = [];
    let limitSeconds: number | null = null;
    if (nextKind === "mock") {
      selected = [
        ...shuffleQuestions(examQuestions.filter((item) => item.section === 1)).slice(0, 12),
        ...shuffleQuestions(examQuestions.filter((item) => item.section === 2)).slice(0, 5),
        ...shuffleQuestions(examQuestions.filter((item) => item.section === 3)).slice(0, 5),
      ];
      limitSeconds = 60 * 60;
    } else if (nextKind === "quick") {
      selected = shuffleQuestions(examQuestions).slice(0, 10);
      limitSeconds = 15 * 60;
    } else if (nextKind === "mistakes") {
      selected = mistakeIds.map((id) => examQuestions.find((item) => item.id === id)).filter((item): item is ExamQuestion => Boolean(item));
    } else {
      const section = Number(nextKind.at(-1)) as ExamSection;
      selected = shuffleQuestions(examQuestions.filter((item) => item.section === section));
    }
    if (!selected.length) return;
    setKind(nextKind); setSessionIds(selected.map((item) => item.id)); setCurrent(0);
    setAnswers({}); setMarked([]); setEndAt(limitSeconds ? Date.now() + limitSeconds * 1000 : null);
    setSecondsLeft(limitSeconds ?? 0); setView("session");
    requestAnimationFrame(() => document.getElementById("exam-top")?.scrollIntoView({ behavior: "smooth" }));
  }

  function submitSession() {
    const wrong = session.filter((item) => answers[item.id] !== item.correct).map((item) => item.id);
    setMistakeIds((old) => Array.from(new Set([...old.filter((id) => !sessionIds.includes(id)), ...wrong])));
    setBestScore((old) => Math.max(old, score));
    setEndAt(null);
    setView("result");
    requestAnimationFrame(() => document.getElementById("exam-top")?.scrollIntoView({ behavior: "smooth" }));
  }

  function clearHistory() {
    localStorage.removeItem(EXAM_STORAGE_KEY);
    setView("menu"); setSessionIds([]); setAnswers({}); setMarked([]); setMistakeIds([]); setBestScore(0); setEndAt(null);
  }

  if (view === "menu") {
    return (
      <section id="exam-top" className="exam-course">
        <div className="exam-hero">
          <div>
            <p><span>本試験形式</span> MOBILE EXAM LAB</p>
            <h1>スマホが、<br /><em>試験会場</em>になる。</h1>
            <p className="exam-lead">全45問から毎回ランダム出題。解答・見直し・採点・誤答復習まで、この画面だけで完結。</p>
          </div>
          <div className="exam-score-board">
            <span>YOUR RECORD</span><b>{bestScore}</b><em>/ 100</em><small>{bestScore >= 70 ? "合格圏に到達" : "70点で合格圏"}</small>
          </div>
        </div>

        <div className="exam-bank-summary">
          <div><b>45</b><span>オリジナル問題</span></div>
          <div><b>3</b><span>出題分野</span></div>
          <div><b>{mistakeIds.length}</b><span>復習待ち</span></div>
          <p>試験仕様：商業簿記・3題以内・60分・70%以上</p>
        </div>

        <div className="exam-mode-grid">
          <article className="mock-mode-card">
            <span>RECOMMENDED</span><h2>60分 総合模試</h2>
            <p>第1問から第3問まで22問を出題。時間切れで自動採点します。</p>
            <ul><li>カウントダウン</li><li>見直しマーク</li><li>中断しても自動保存</li></ul>
            <button onClick={() => startSession("mock")}>模試を開始する<span>→</span></button>
          </article>
          <article><span>15 MIN</span><h2>10問クイック</h2><p>すきま時間に全分野からランダム出題。</p><button onClick={() => startSession("quick")}>10問解く<span>→</span></button></article>
          <article><span>24 QUESTIONS</span><h2>第1問｜仕訳</h2><p>勘定科目と借方・貸方を反射的に選ぶ。</p><button onClick={() => startSession("section1")}>仕訳を特訓<span>→</span></button></article>
          <article><span>10 QUESTIONS</span><h2>第2問｜帳簿</h2><p>補助簿・伝票・勘定記入を集中攻略。</p><button onClick={() => startSession("section2")}>帳簿を特訓<span>→</span></button></article>
          <article><span>11 QUESTIONS</span><h2>第3問｜決算</h2><p>整理仕訳・精算表・利益計算を反復。</p><button onClick={() => startSession("section3")}>決算を特訓<span>→</span></button></article>
          <article className={mistakeIds.length ? "mistake-mode-card" : "mistake-mode-card disabled"}><span>{mistakeIds.length} TO REVIEW</span><h2>まちがいだけ</h2><p>過去の誤答を正解するまで解き直す。</p><button disabled={!mistakeIds.length} onClick={() => startSession("mistakes")}>復習を始める<span>↻</span></button></article>
        </div>
        <div className="exam-notice"><b>問題について</b><p>日本商工会議所の過去問・サンプル問題の転載ではありません。現行の出題範囲と試験形式を参考に作成した、学習用オリジナル問題です。</p></div>
        <button className="exam-clear" onClick={clearHistory}>演習履歴をリセット</button>
      </section>
    );
  }

  if (view === "result") {
    const sectionResults = ([1, 2, 3] as ExamSection[]).map((section) => {
      const items = session.filter((item) => item.section === section);
      const correct = items.filter((item) => answers[item.id] === item.correct).length;
      return { section, total: items.length, correct };
    }).filter((item) => item.total > 0);
    return (
      <section id="exam-top" className="exam-course exam-result-page">
        <div className={`exam-result-score ${score >= 70 ? "pass" : "retry"}`}>
          <span>{score >= 70 ? "合格圏" : "あと一歩"}</span><h1>{score}<small>/100</small></h1>
          <p>{correctCount}問正解 ／ {session.length}問中</p>
          <b>{score >= 70 ? "この調子。本番でも時間配分を崩さずに。" : "誤答だけを解き直せば、次の伸びが速い。"}</b>
        </div>
        <div className="exam-section-results">
          {sectionResults.map((item) => <div key={item.section}><span>{sectionMeta[item.section].label}</span><b>{item.correct}<small>/{item.total}</small></b><i><em style={{ width: `${Math.round((item.correct / item.total) * 100)}%` }} /></i></div>)}
        </div>
        <div className="exam-result-actions">
          <button className="primary-cta" disabled={!mistakeIds.length} onClick={() => startSession("mistakes")}>まちがいだけ解き直す<span>↻</span></button>
          <button className="secondary-cta secondary-button" onClick={() => setView("menu")}>演習メニューへ</button>
        </div>
        <div className="exam-review-list">
          <div className="exam-review-heading"><span>ANSWER REVIEW</span><h2>解答と解説</h2></div>
          {session.map((item, index) => {
            const picked = answers[item.id]; const isCorrect = picked === item.correct;
            return <details key={item.id} open={!isCorrect}><summary><span className={isCorrect ? "ok" : "ng"}>{isCorrect ? "○" : "×"}</span><small>{sectionMeta[item.section].label}｜{item.topic}</small><b>{index + 1}. {item.prompt}</b></summary><div><p>あなたの解答：{picked === undefined ? "未解答" : item.choices[picked]}</p><p>正解：<strong>{item.choices[item.correct]}</strong></p><em>{item.explanation}</em></div></details>;
          })}
        </div>
      </section>
    );
  }

  if (!question) return null;
  const meta = sectionMeta[question.section];
  return (
    <section id="exam-top" className="exam-session">
      <header className="exam-session-bar">
        <button onClick={() => setView("menu")} aria-label="演習を中断してメニューへ">×</button>
        <div><span>{kind === "mock" ? "60分 総合模試" : kind === "quick" ? "10問クイック" : "分野別演習"}</span><b>{answeredCount}/{session.length} 回答済み</b></div>
        {endAt ? <time className={secondsLeft < 300 ? "danger" : ""}>{formatTime(secondsLeft)}</time> : <time>∞</time>}
      </header>

      <div className="exam-session-body">
        <nav className="exam-question-nav" aria-label="問題一覧">
          {session.map((item, index) => <button key={item.id} className={`${index === current ? "active" : ""} ${answers[item.id] !== undefined ? "answered" : ""} ${marked.includes(item.id) ? "marked" : ""}`} onClick={() => setCurrent(index)} aria-label={`問題${index + 1}${answers[item.id] !== undefined ? " 回答済み" : ""}${marked.includes(item.id) ? " 見直し" : ""}`}>{index + 1}</button>)}
        </nav>

        <article className="exam-question-card">
          <div className="exam-question-meta"><span style={{ background: meta.color }}>{meta.label}</span><b>{meta.title}｜{question.topic}</b><em>Q {current + 1} / {session.length}</em></div>
          <h1>{question.prompt}</h1>
          <div className="exam-choice-list">
            {question.choices.map((choice, index) => <button key={choice} className={answers[question.id] === index ? "selected" : ""} onClick={() => setAnswers((old) => ({ ...old, [question.id]: index }))}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>)}
          </div>
          <button className={`review-mark ${marked.includes(question.id) ? "active" : ""}`} onClick={() => setMarked((old) => old.includes(question.id) ? old.filter((id) => id !== question.id) : [...old, question.id])}>{marked.includes(question.id) ? "★ 見直しリストに追加済み" : "☆ あとで見直す"}</button>
        </article>

        <div className="exam-mobile-actions">
          <button disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}>← 前へ</button>
          {current < session.length - 1 ? <button className="next" onClick={() => setCurrent((value) => Math.min(session.length - 1, value + 1))}>次へ →</button> : <button className="submit" onClick={submitSession}>採点する</button>}
        </div>
        <div className="exam-submit-row"><p>未回答 <b>{session.length - answeredCount}</b>問 ／ 見直し <b>{marked.length}</b>問</p><button onClick={submitSession}>答案を提出して採点</button></div>
      </div>
    </section>
  );
}
