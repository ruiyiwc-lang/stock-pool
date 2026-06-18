// ===== 泡沫温度计 - 共享数据 & 计算引擎 =====
// 被 index.html 和 bubble.html 共同引用，保证数据一致性
// 更新数据时只改这一个文件

var BUBBLE_LAYERS = {
'05':{wt:40,items:[
{k:'credit_spread',n:'Credit Spread',cn:'高收益债信用利差',u:'bps',w:20,s:350,d:450,dir:'asc'},
{k:'margin_debt',n:'Margin Debt',cn:'保证金负债',u:'$T',w:8,s:1.15,d:1.45,dir:'asc'},
{k:'growth_value',n:'Growth/Value',cn:'成长vs价值轮动',u:'月',w:6,s:2,d:6,dir:'asc'},
{k:'market_breadth',n:'Market Breadth',cn:'市场宽度>200DMA',u:'%',w:6,s:60,d:40,dir:'desc'}
]},
'0':{wt:30,items:[
{k:'openai_arr',n:'OpenAI/Anthropic',cn:'季度营收增速',u:'%QoQ',w:6,s:30,d:10,dir:'desc'},
{k:'enterprise_budget',n:'Enterprise',cn:'企业AI预算',u:'0-1',w:1,s:.33,d:.67,dir:'asc'},
{k:'token_price_war',n:'Token War',cn:'Token价格战',u:'0-1',w:5,s:.33,d:.67,dir:'asc'},
{k:'csp_capex',n:'CSP Capex',cn:'云厂资本开支',u:'0-1',w:8,s:.33,d:.67,dir:'asc'},
{k:'ipo_progress',n:'AI IPO',cn:'IPO进度',u:'0-1',w:1,s:.33,d:.67,dir:'asc'},
{k:'dram_spot',n:'DRAM Spot',cn:'DRAM现货溢价',u:'%',w:4,s:15,d:0,dir:'desc'},
{k:'cowos_lead',n:'CoWoS',cn:'先进封装交期',u:'月',w:3,s:5,d:3,dir:'desc'},
{k:'h100_price',n:'H100 Used',cn:'H100二手价',u:'$K',w:2,s:17,d:14,dir:'desc'}
]},
'1':{wt:30,items:[
{k:'nvda_pe',n:'NVDA Fwd PE',cn:'英伟达远期PE',u:'x',w:10,s:22,d:18,dir:'desc'},
{k:'sox',n:'SOX',cn:'费城半导体',u:'%距高',w:6,s:10,d:25,dir:'asc'},
{k:'tsm',n:'TSM',cn:'台积电',u:'%距高',w:5,s:10,d:25,dir:'asc'},
{k:'sk_hynix',n:'SK Hynix',cn:'海力士',u:'%距高',w:2,s:10,d:25,dir:'asc'},
{k:'avgo',n:'AVGO',cn:'博通',u:'%距高',w:3,s:10,d:25,dir:'asc'},
{k:'mu',n:'MU',cn:'美光',u:'%距高',w:2,s:10,d:25,dir:'asc'},
{k:'xuchuang',n:'中际旭创',cn:'光模块300308',u:'%距高',w:1,s:10,d:25,dir:'asc'},
{k:'hudian',n:'沪电股份',cn:'PCB 002463',u:'%距高',w:1,s:10,d:25,dir:'asc'},
{k:'fulian',n:'工业富联',cn:'服务器601138',u:'%距高',w:1,s:10,d:25,dir:'asc'},
{k:'etf_512480',n:'半导体ETF',cn:'512480',u:'%距高',w:1,s:10,d:25,dir:'asc'}
]}
};

// ==== BUBBLE_DATA_START ====
var BUBBLE_DATA = {
  updateDate: '2026-06-14',
  manual: {
    gate1: true,
    gate1_demand: 'strong',
    gate1_token: 'up_up',
    gate1_gpu: 'extreme',
    gate1_note: 'Token涨价30%+量翻倍+客户扩量+GPU极度紧缺',
    gate1_date: '2026-06-13',
    baba_growth: 45,
    nvda_growth: 70,
    baba_pe: 17.4,
    avgo_judgment: 'idio'
  },
  layer05: {
    credit_spread: { value: 278, unit: 'bps', date: '2026-06-11', source: 'FRED' },
    margin_debt: { value: 1.30, unit: '$T', date: '2026-04-30', source: 'FINRA' },
    growth_value: { value: 0, unit: '月Value跑赢', date: '2026-06-14', source: 'Morningstar' },
    market_breadth: { value: 61, unit: '%>200DMA', date: '2026-06-13', source: 'Barchart' }
  },
  layer0: {
    openai_arr: { value: 40, unit: '%QoQ', date: '2026-05-15', source: 'The Information' },
    enterprise_budget: { value: 0.3, unit: '0-1级别', date: '2026-06-14', source: 'CIO/FairPlay' },
    token_price_war: { value: 0.2, unit: '0-1级别', date: '2026-06-14', source: 'API pricing' },
    csp_capex: { value: 0.05, unit: '0-1级别', date: '2026-05-01', source: 'Earnings transcripts' },
    ipo_progress: { value: 0.1, unit: '0-1级别', date: '2026-06-10', source: 'Reuters' },
    dram_spot: { value: 5, unit: '%溢价', date: '2026-06-14', source: 'TrendForce' },
    cowos_lead: { value: 14, unit: '月', date: '2026-06-14', source: 'Silicon Analysts' },
    h100_price: { value: 19, unit: '$K', date: '2026-06-14', source: 'SiliconData' }
  },
  layer1: {
    nvda_pe: { value: 20.7, unit: 'x', date: '2026-06-13', source: 'Stock Analysis' },
    sox: { value: 5.9, unit: '%距高点', high: 13998, price: 13171, date: '2026-06-13', source: 'Yahoo Finance' },
    tsm: { value: 5.8, unit: '%距高点', high: 450.16, price: 423.93, date: '2026-06-13', source: 'Stock Analysis' },
    sk_hynix: { value: 10.2, unit: '%距高点', high: 2407000, price: 2162000, date: '2026-06-13', source: 'Bloomberg' },
    avgo: { value: 22.8, unit: '%距高点', high: 495, price: 382, date: '2026-06-13', source: 'Yahoo Finance' },
    mu: { value: 9.9, unit: '%距高点', high: 1089, price: 981, date: '2026-06-13', source: 'Yahoo Finance' },
    xuchuang: { value: 12.0, unit: '%距高点', high: 1320, price: 1161, date: '2026-06-13', source: '东方财富' },
    hudian: { value: 12.3, unit: '%距高点', high: 142.78, price: 125.20, date: '2026-06-13', source: '东方财富' },
    fulian: { value: 12.8, unit: '%距高点', high: 84.95, price: 74.06, date: '2026-06-13', source: '东方财富' },
    etf_512480: { value: 6.4, unit: '%距高点', high: 2.22, price: 2.078, date: '2026-06-13', source: '东方财富' }
  },
  layer2: {
    tencent_pe: { value: 13.1, unit: 'x', date: '2026-06-13', source: 'GuruFocus' },
    baba_pe: { value: 17.4, unit: 'x', date: '2026-06-13', source: 'GuruFocus' },
    tsm_pe: { value: 22.2, unit: 'x', date: '2026-06-13', source: 'Stock Analysis' },
    asml_pe: { value: 46.3, unit: 'x', date: '2026-06-13', source: 'ValueInvesting.io' },
    asml_from_peak: { value: 4, unit: '%距峰€1700', date: '2026-06-13', source: 'Bloomberg' }
  },
  layer3: {
    vix: { value: 17.7, date: '2026-06-13', source: 'CBOE' },
    us10y: { value: 4.45, unit: '%', date: '2026-06-13', source: 'FRED' },
    gold: { value: 4211, unit: '$/oz', date: '2026-06-13', source: 'GoldPrice.org' },
    brent: { value: 87.3, unit: '$/bbl', date: '2026-06-13', source: 'Trading Economics' },
    copper: { value: 14200, unit: '$/t', date: '2026-06-13', source: 'LME' },
    cnooc_yield: { value: 5.1, unit: '%股息率', date: '2026-06-13', source: 'Yahoo Finance' },
    cssc_pb: { value: 1.36, unit: 'xPB', date: '2026-06-13', source: '财报帮' }
  },
  a_shares: {
    smic: { price: 124.88, change: -1.98, date: '2026-06-13', source: '同花顺' },
    sourcejet: { price: 1394, change: -0.45, date: '2026-06-13', source: '东方财富' },
    cxmt_ipo: { status: '已过会·注册生效·等待发行', date: '2026-06-14', source: '财联社' }
  }
};
// ==== BUBBLE_DATA_END ====

// ===== 评分引擎 =====
var BUBBLE_LAYER_MAP = {'05':'layer05','0':'layer0','1':'layer1'};

function bubbleCalcSc(v, s, d, dir) {
  if (v == null || isNaN(v)) return 0;
  if (dir === 'asc') {
    if (v <= s) return Math.max(0, v / Math.max(s, .01) * 40);
    if (v <= d) return 40 + (v - s) / Math.max(d - s, .01) * 30;
    return Math.min(100, 70 + (v - d) / Math.max(d - s, .01) * 30);
  } else {
    if (v >= s) return Math.max(0, 40 - ((v - s) / Math.max(s, .01) * 40));
    if (v >= d) return 40 + (s - v) / Math.max(s - d, .01) * 30;
    return Math.min(100, 70 + (d - v) / Math.max(s - d, .01) * 30);
  }
}

// 读取 localStorage 配置覆盖 BUBBLE_LAYERS（和 bubble.html 逻辑一致）
function bubbleLoadCfg() {
  try {
    var s = localStorage.getItem('bubble_cfg_v3');
    if (!s) return;
    var p = JSON.parse(s);
    for (var lk in BUBBLE_LAYERS) {
      if (!p[lk]) continue;
      var items = BUBBLE_LAYERS[lk].items;
      for (var i = 0; i < items.length; i++) {
        var sv = p[lk][items[i].k];
        if (sv) {
          if (sv.w != null) items[i].w = sv.w;
          if (sv.s != null) items[i].s = sv.s;
          if (sv.d != null) items[i].d = sv.d;
        }
      }
      if (p[lk]._wt != null) BUBBLE_LAYERS[lk].wt = p[lk]._wt;
    }
  } catch(e) {}
}

// 计算最终温度（含 localStorage 配置覆盖）
function bubbleCalcTemp() {
  bubbleLoadCfg();
  var totalWt = 0, weightedSc = 0;
  for (var lk in BUBBLE_LAYERS) {
    var layer = BUBBLE_LAYERS[lk];
    var dataKey = BUBBLE_LAYER_MAP[lk];
    var lData = BUBBLE_DATA[dataKey] || {};
    var lWt = 0, lSc = 0;
    for (var i = 0; i < layer.items.length; i++) {
      var item = layer.items[i];
      var entry = lData[item.k];
      var v = entry ? entry.value : null;
      var sc = bubbleCalcSc(v, item.s, item.d, item.dir);
      lSc += sc * item.w;
      lWt += item.w;
    }
    var layerScore = lWt > 0 ? lSc / lWt : 0;
    weightedSc += layerScore * layer.wt;
    totalWt += layer.wt;
  }
  return totalWt > 0 ? Math.round(weightedSc / totalWt) : 0;
}
