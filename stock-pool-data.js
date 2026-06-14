// 逆向股票池配置 — 由cron每晚全量扫描更新
// 此文件只存储"哪些股票在池中"及其阈值，不存储实时价格
// 实时价格由网页前端JS直接从东方财富API拉取
// redSince: 红灯起始日期，连续红灯超60天自动踢出

const STOCK_POOL_CONFIG = {
  lastScan: '2026-06-14',
  
  stocks: [
    // === 消费 ===
    { code: '600519', name: '贵州茅台', market: 'SH', sector: '消费',
      lineA: 1300, lineB: 1100, red: 2100, anchor: 'PE', anchorVal: '19.5x',
      note: '5年PE 5%分位｜盈利2026E+5%｜股息4%｜A=PE 19.5x｜B=PE 16.5x' },
    { code: '600887', name: '伊利股份', market: 'SH', sector: '消费',
      lineA: 26, lineB: 20, red: 38, anchor: 'PE', anchorVal: '13.5x',
      note: '5年PE 5%分位｜盈利+10%｜股息5.3%｜A=PE 13.5x｜B=PE 10.5x' },
    { code: '603288', name: '海天味业', market: 'SH', sector: '消费',
      lineA: 36, lineB: 26, red: 53, anchor: 'PE', anchorVal: '30x',
      note: '5年PE 5%分位｜盈利+11%｜A=PE 30x｜B=PE 22x' },
    { code: '09633', name: '农夫山泉', market: 'HK', sector: '消费',
      lineA: 45, lineB: 35, red: 82, anchor: 'PE', anchorVal: '27x',
      note: '3年PE 12%分位｜历史中位数40x｜A=PE 27x｜B=PE 21x' },
    { code: '000568', name: '泸州老窖', market: 'SZ', sector: '消费',
      lineA: 85, lineB: 65, red: 140, anchor: 'PE', anchorVal: '12.6x',
      note: '5年PE <10%分位｜盈利-20%⚠️｜股息6.8%｜A=PE 12.6x｜B=PE 9.5x' },
    { code: '000651', name: '格力电器', market: 'SZ', sector: '消费',
      lineA: 39, lineB: 30, red: 55, anchor: 'PE', anchorVal: '5.2x',
      note: 'PE极低｜股息7.5%｜现金1100亿｜A=PE 5.2x｜B=PE 4x' },

    // === 医药 ===
    { code: '600276', name: '恒瑞医药', market: 'SH', sector: '医药',
      lineA: 49, lineB: 36, red: 66, anchor: 'PE', anchorVal: '40x',
      note: '5年PE 3%分位｜盈利+22%｜创新药占62%｜A=PE 40x｜B=PE 30x' },
    { code: '603259', name: '药明康德', market: 'SH', sector: '医药',
      lineA: 100, lineB: 72, red: 178, anchor: 'PE', anchorVal: '22x',
      note: '5年PE 5%分位｜扣非+32%｜BIOSECURE风险｜A=PE 22x｜B=PE 16x' },
    { code: '300015', name: '爱尔眼科', market: 'SZ', sector: '医药',
      lineA: 8.5, lineB: 6.5, red: 19, anchor: 'PE', anchorVal: '18x',
      note: '5年PE <3%分位｜2026Q1恢复+12.5%｜A=PE 18x｜B=PE 14x' },

    // === 金融 ===
    { code: '601318', name: '中国平安', market: 'SH', sector: '金融',
      lineA: 55, lineB: 42, red: 70, anchor: 'PEV', anchorVal: '0.66x',
      note: '3年PE 1.7%分位｜NBV+29%｜股息4.7%｜A=PEV 0.66x｜B=PEV 0.5x' },
    { code: '600036', name: '招商银行', market: 'SH', sector: '金融',
      lineA: 40, lineB: 30, red: 51, anchor: 'PB', anchorVal: '0.83x',
      note: 'PB破净｜股息5.2%｜H股罕见溢价A股｜A=PB 0.83x｜B=PB 0.63x' },
    { code: '600030', name: '中信证券', market: 'SH', sector: '金融',
      lineA: 27, lineB: 20, red: 32, anchor: 'PB', anchorVal: '1.2x',
      note: '5年PE 10%分位｜盈利+38.6%｜波动大｜A=PB 1.2x｜B=PB 0.9x' },

    // === 科技/新能源 ===
    { code: '00700', name: '腾讯控股', market: 'HK', sector: '科技',
      lineA: 420, lineB: 350, red: 700, anchor: 'PE', anchorVal: '16x',
      note: '3年PE 27%分位｜盈利稳增长｜A=PE 14.5x｜B=PE 12x' },
    { code: '300750', name: '宁德时代', market: 'SZ', sector: '新能源',
      lineA: 340, lineB: 260, red: 500, anchor: 'PE', anchorVal: '23x',
      note: '5年PE 55%分位(中性)｜2026E+30%｜A=PE 20x｜B=PE 15x' },
    { code: '300274', name: '阳光电源', market: 'SZ', sector: '新能源',
      lineA: 135, lineB: 100, red: 200, anchor: 'PE', anchorVal: '15x',
      note: 'PE历史低位｜利润+26-41%｜PEG 0.4｜A=PE 13.5x｜B=PE 10x' },
    { code: '09999', name: '网易', market: 'HK', sector: '科技',
      lineA: 180, lineB: 145, red: 280, anchor: 'PE', anchorVal: '12x',
      note: '3年PE底部附近｜游戏+12%｜A=PE 11x｜B=PE 8.5x' },

    // === 周期/资源 ===
    { code: '600938', name: '中国海油', market: 'SH', sector: '资源',
      lineA: 28, lineB: 24, red: 38, anchor: '股息率', anchorVal: '4.0%',
      redSince: '2026-06-14',
      note: '3年PE 88%分位(偏贵)｜需等油价跌｜A=股息5%｜B=股息6%' },
    { code: '601899', name: '紫金矿业', market: 'SH', sector: '资源',
      lineA: 26, lineB: 22, red: 50, anchor: 'PE', anchorVal: '12x',
      note: '铜金价峰值→周期陷阱风险｜A=PE 10.7x｜B=PE 9x' },
    { code: '600150', name: '中国船舶', market: 'SH', sector: '周期',
      lineA: 32, lineB: 26, red: 50, anchor: 'PB', anchorVal: '1.76x',
      note: '利润翻倍但周期顶部特征｜A=PB 1.6x｜B=PB 1.3x' },

    // === 公用事业/高息 ===
    { code: '600900', name: '长江电力', market: 'SH', sector: '公用',
      lineA: 25, lineB: 21, red: 32, anchor: 'PE', anchorVal: '19x',
      note: 'PE接近中枢｜股息3.7%｜A=PE 17x｜B=PE 14x' },
    { code: '600941', name: '中国移动', market: 'SH', sector: '公用',
      lineA: 82, lineB: 70, red: 100, anchor: 'PE', anchorVal: '15x',
      redSince: '2026-06-14',
      note: 'A股PE高位(88%分位)｜股息4.8%｜A=PE 13x｜B=PE 11x' },
    { code: '00823', name: '领展REIT', market: 'HK', sector: '公用',
      lineA: 37, lineB: 28, red: 55, anchor: '股息率', anchorVal: '6%+',
      note: '股息6%+｜估值较均值低1σ｜A=息率6%｜B=息率8%' },
  ]
};
