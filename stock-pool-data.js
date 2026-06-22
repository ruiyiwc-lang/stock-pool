// AI估值泡沫破灭逆向股票池 — 配置文件
// cron每晚20:00全量扫描更新此文件
// 实时价格由网页前端JS从东方财富API拉取(30s刷新)
//
// zone: 'pool'=正式池 | 'watch'=观察区
// 观察区规则：新入池标的先进观察区30天→转正式池；红灯超30天→移入观察区→再30天仍红灯→踢出
// addedDate: 入池日期(用于观察区计时)
// redSince: 红灯起始日期

const STOCK_POOL_CONFIG = {
  lastScan: '2026-06-22',
  
  stocks: [
    // === 消费 ===
    { code: '600519', name: '贵州茅台', market: 'SH', sector: '消费', zone: 'pool',
      lineA: 915, lineB: 732, red: 1830, anchor: 'PE', anchorVal: '15x',
      addedDate: '2026-06-22',
      note: 'v2.3瑕疵全量化｜完美30x→扣15x(批价破1499+首次双降+不设目标+人口断崖)→正常PE15x｜大底PE12x' },
    { code: '600887', name: '伊利股份', market: 'SH', sector: '消费', zone: 'pool',
      lineA: 26, lineB: 20, red: 38, anchor: 'PE', anchorVal: '13.5x',
      addedDate: '2026-06-14',
      note: '5年PE 5%分位｜盈利+10%｜股息5.3%｜A=PE 13.5x｜B=PE 10.5x' },
    { code: '603288', name: '海天味业', market: 'SH', sector: '消费', zone: 'pool',
      lineA: 36, lineB: 26, red: 53, anchor: 'PE', anchorVal: '30x',
      addedDate: '2026-06-14',
      note: '5年PE 5%分位｜盈利+11%｜A=PE 30x｜B=PE 22x' },
    { code: '09633', name: '农夫山泉', market: 'HK', sector: '消费', zone: 'pool',
      lineA: 45, lineB: 35, red: 82, anchor: 'PE', anchorVal: '27x',
      addedDate: '2026-06-14',
      note: '3年PE 12%分位｜历史中位数40x｜A=PE 27x｜B=PE 21x' },
    { code: '000568', name: '泸州老窖', market: 'SZ', sector: '消费', zone: 'pool',
      lineA: 85, lineB: 65, red: 140, anchor: 'PE', anchorVal: '12.6x',
      addedDate: '2026-06-14',
      note: '5年PE <10%分位｜盈利-20%⚠️｜股息6.8%｜A=PE 12.6x｜B=PE 9.5x' },
    { code: '000651', name: '格力电器', market: 'SZ', sector: '消费', zone: 'pool',
      lineA: 39, lineB: 30, red: 55, anchor: 'PE', anchorVal: '5.2x',
      addedDate: '2026-06-14',
      note: 'PE极低｜股息7.5%｜现金1100亿｜A=PE 5.2x｜B=PE 4x' },

    // === 医药 ===
    { code: '600276', name: '恒瑞医药', market: 'SH', sector: '医药', zone: 'pool',
      lineA: 49, lineB: 36, red: 66, anchor: 'PE', anchorVal: '40x',
      addedDate: '2026-06-14',
      note: '5年PE 3%分位｜盈利+22%｜创新药占62%｜A=PE 40x｜B=PE 30x' },
    { code: '603259', name: '药明康德', market: 'SH', sector: '医药', zone: 'pool',
      lineA: 121, lineB: 80, red: 216, anchor: 'PE', anchorVal: '18x',
      addedDate: '2026-06-22',
      note: 'v2.3瑕疵全量化｜完美30x→BIOSECURE+1260H结构性-10x+周期半扣-2x→正常PE18x｜大底PE12x' },
    { code: '300015', name: '爱尔眼科', market: 'SZ', sector: '医药', zone: 'pool',
      lineA: 8.5, lineB: 6.5, red: 19, anchor: 'PE', anchorVal: '18x',
      addedDate: '2026-06-14',
      note: '5年PE <3%分位｜2026Q1恢复+12.5%｜A=PE 18x｜B=PE 14x' },

    // === 金融 ===
    { code: '601318', name: '中国平安', market: 'SH', sector: '金融', zone: 'pool',
      lineA: 55, lineB: 42, red: 70, anchor: 'PEV', anchorVal: '0.66x',
      addedDate: '2026-06-14',
      note: '3年PE 1.7%分位｜NBV+29%｜股息4.7%｜A=PEV 0.66x｜B=PEV 0.5x' },
    { code: '600036', name: '招商银行', market: 'SH', sector: '金融', zone: 'pool',
      lineA: 40, lineB: 30, red: 51, anchor: 'PB', anchorVal: '0.83x',
      addedDate: '2026-06-14',
      note: 'PB破净｜股息5.2%｜H股罕见溢价A股｜A=PB 0.83x｜B=PB 0.63x' },
    { code: '600030', name: '中信证券', market: 'SH', sector: '金融', zone: 'pool',
      lineA: 27, lineB: 20, red: 32, anchor: 'PB', anchorVal: '1.2x',
      addedDate: '2026-06-14',
      note: '5年PE 10%分位｜盈利+38.6%｜波动大｜A=PB 1.2x｜B=PB 0.9x' },

    // === 科技/新能源 ===
    { code: '00700', name: '腾讯控股', market: 'HK', sector: '科技', zone: 'pool',
      lineA: 450, lineB: 310, red: 826, anchor: 'PE', anchorVal: '13x',
      addedDate: '2026-06-22',
      note: 'v2.3瑕疵全量化｜完美24x→结构性-5.5x+周期半扣-5.3x→正常PE13x｜大底PE9x' },
    { code: '300750', name: '宁德时代', market: 'SZ', sector: '新能源', zone: 'pool',
      lineA: 419, lineB: 293, red: 585, anchor: 'PE', anchorVal: '21.5x',
      addedDate: '2026-06-22',
      note: 'v2.3瑕疵全量化｜完美30x→去宁化+关税结构性-6x+周期半扣-2.5x→正常PE21.5x｜大底PE15x' },
    { code: '300274', name: '阳光电源', market: 'SZ', sector: '新能源', zone: 'pool',
      lineA: 135, lineB: 100, red: 200, anchor: 'PE', anchorVal: '15x',
      addedDate: '2026-06-14',
      note: 'PE历史低位｜利润+26-41%｜PEG 0.4｜A=PE 13.5x｜B=PE 10x' },
    { code: '09999', name: '网易', market: 'HK', sector: '科技', zone: 'pool',
      lineA: 180, lineB: 145, red: 280, anchor: 'PE', anchorVal: '12x',
      addedDate: '2026-06-14',
      note: '3年PE底部附近｜游戏+12%｜A=PE 11x｜B=PE 8.5x' },

    // === 周期/资源 ===
    { code: '601899', name: '紫金矿业', market: 'SH', sector: '资源', zone: 'pool',
      lineA: 26, lineB: 22, red: 50, anchor: 'PE', anchorVal: '12x',
      addedDate: '2026-06-14',
      note: '铜金价峰值→周期陷阱风险｜A=PE 10.7x｜B=PE 9x' },
    { code: '600150', name: '中国船舶', market: 'SH', sector: '周期', zone: 'pool',
      lineA: 32, lineB: 26, red: 50, anchor: 'PB', anchorVal: '1.76x',
      addedDate: '2026-06-14',
      note: '利润翻倍但周期顶部特征｜A=PB 1.6x｜B=PB 1.3x' },

    // === 公用事业/高息 ===
    { code: '600900', name: '长江电力', market: 'SH', sector: '公用', zone: 'pool',
      lineA: 25, lineB: 21, red: 32, anchor: 'PE', anchorVal: '19x',
      addedDate: '2026-06-14',
      note: 'PE接近中枢｜股息3.7%｜A=PE 17x｜B=PE 14x' },
    { code: '00823', name: '领展REIT', market: 'HK', sector: '公用', zone: 'pool',
      lineA: 37, lineB: 28, red: 55, anchor: '股息率', anchorVal: '6%+',
      addedDate: '2026-06-14',
      note: '股息6%+｜估值较均值低1σ｜A=息率6%｜B=息率8%' },

    // === 观察区 (红灯降级 / 新入池待验证) ===
    { code: '600938', name: '中国海油', market: 'SH', sector: '资源', zone: 'watch',
      lineA: 28, lineB: 24, red: 38, anchor: '股息率', anchorVal: '4.0%',
      addedDate: '2026-06-14', redSince: '2026-06-14',
      note: '3年PE 88%分位(偏贵)｜需等油价跌｜A=股息5%｜B=股息6%' },
    { code: '600941', name: '中国移动', market: 'SH', sector: '公用', zone: 'watch',
      lineA: 82, lineB: 70, red: 100, anchor: 'PE', anchorVal: '15x',
      addedDate: '2026-06-14', redSince: '2026-06-14',
      note: 'A股PE高位(88%分位)｜股息4.8%｜A=PE 13x｜B=PE 11x' },
  ]
};
