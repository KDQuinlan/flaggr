/**
 * Flag Index: Dynamically render local SVG flags in React Native.
 *
 * This file imports all SVG flag components from the `./resources` directory
 * and exports them as a single object (or "map"). The keys of this object
 * are the lowercase two-letter country codes (ISO 3166-1 alpha-2).
 *
 * This allows for dynamic flag rendering based on a country code string,
 * like so:
 *
 * import flags from './assets/images/flags';
 * const countryCode = 'us';
 * const FlagComponent = flags[countryCode];
 * return <FlagComponent width={100} height={60} />;
 *
 */

import type { SvgProps } from 'react-native-svg';
import type React from 'react';

// Import all flag SVGs from the resources directory
import AdFlag from './resources/ad.svg';
import AeFlag from './resources/ae.svg';
import AfFlag from './resources/af.svg';
import AgFlag from './resources/ag.svg';
import AiFlag from './resources/ai.svg';
import AlFlag from './resources/al.svg';
import AmFlag from './resources/am.svg';
import AoFlag from './resources/ao.svg';
import AqFlag from './resources/aq.svg';
import ArFlag from './resources/ar.svg';
import AsFlag from './resources/as.svg';
import AtFlag from './resources/at.svg';
import AuFlag from './resources/au.svg';
import AwFlag from './resources/aw.svg';
import AxFlag from './resources/ax.svg';
import AzFlag from './resources/az.svg';
import BaFlag from './resources/ba.svg';
import BbFlag from './resources/bb.svg';
import BdFlag from './resources/bd.svg';
import BeFlag from './resources/be.svg';
import BfFlag from './resources/bf.svg';
import BgFlag from './resources/bg.svg';
import BhFlag from './resources/bh.svg';
import BiFlag from './resources/bi.svg';
import BjFlag from './resources/bj.svg';
import BlFlag from './resources/bl.svg';
import BmFlag from './resources/bm.svg';
import BnFlag from './resources/bn.svg';
import BoFlag from './resources/bo.svg';
import BqFlag from './resources/bq.svg';
import BrFlag from './resources/br.svg';
import BsFlag from './resources/bs.svg';
import BtFlag from './resources/bt.svg';
import BvFlag from './resources/bv.svg';
import BwFlag from './resources/bw.svg';
import ByFlag from './resources/by.svg';
import BzFlag from './resources/bz.svg';
import CaFlag from './resources/ca.svg';
import CcFlag from './resources/cc.svg';
import CdFlag from './resources/cd.svg';
import CfFlag from './resources/cf.svg';
import CgFlag from './resources/cg.svg';
import ChFlag from './resources/ch.svg';
import CiFlag from './resources/ci.svg';
import CkFlag from './resources/ck.svg';
import ClFlag from './resources/cl.svg';
import CmFlag from './resources/cm.svg';
import CnFlag from './resources/cn.svg';
import CoFlag from './resources/co.svg';
import CrFlag from './resources/cr.svg';
import CuFlag from './resources/cu.svg';
import CvFlag from './resources/cv.svg';
import CwFlag from './resources/cw.svg';
import CxFlag from './resources/cx.svg';
import CyFlag from './resources/cy.svg';
import CzFlag from './resources/cz.svg';
import DeFlag from './resources/de.svg';
import DjFlag from './resources/dj.svg';
import DkFlag from './resources/dk.svg';
import DmFlag from './resources/dm.svg';
import DoFlag from './resources/do.svg';
import DzFlag from './resources/dz.svg';
import EcFlag from './resources/ec.svg';
import EeFlag from './resources/ee.svg';
import EgFlag from './resources/eg.svg';
import EhFlag from './resources/eh.svg';
import ErFlag from './resources/er.svg';
import EsFlag from './resources/es.svg';
import EtFlag from './resources/et.svg';
import FiFlag from './resources/fi.svg';
import FjFlag from './resources/fj.svg';
import FkFlag from './resources/fk.svg';
import FmFlag from './resources/fm.svg';
import FoFlag from './resources/fo.svg';
import FrFlag from './resources/fr.svg';
import GaFlag from './resources/ga.svg';
import GbFlag from './resources/gb.svg';
import GdFlag from './resources/gd.svg';
import GeFlag from './resources/ge.svg';
import GfFlag from './resources/gf.svg';
import GgFlag from './resources/gg.svg';
import GhFlag from './resources/gh.svg';
import GiFlag from './resources/gi.svg';
import GlFlag from './resources/gl.svg';
import GmFlag from './resources/gm.svg';
import GnFlag from './resources/gn.svg';
import GpFlag from './resources/gp.svg';
import GqFlag from './resources/gq.svg';
import GrFlag from './resources/gr.svg';
import GsFlag from './resources/gs.svg';
import GtFlag from './resources/gt.svg';
import GuFlag from './resources/gu.svg';
import GwFlag from './resources/gw.svg';
import GyFlag from './resources/gy.svg';
import HkFlag from './resources/hk.svg';
import HmFlag from './resources/hm.svg';
import HnFlag from './resources/hn.svg';
import HrFlag from './resources/hr.svg';
import HtFlag from './resources/ht.svg';
import HuFlag from './resources/hu.svg';
import IdFlag from './resources/id.svg';
import IeFlag from './resources/ie.svg';
import IlFlag from './resources/il.svg';
import ImFlag from './resources/im.svg';
import InFlag from './resources/in.svg';
import IoFlag from './resources/io.svg';
import IqFlag from './resources/iq.svg';
import IrFlag from './resources/ir.svg';
import IsFlag from './resources/is.svg';
import ItFlag from './resources/it.svg';
import JeFlag from './resources/je.svg';
import JmFlag from './resources/jm.svg';
import JoFlag from './resources/jo.svg';
import JpFlag from './resources/jp.svg';
import KeFlag from './resources/ke.svg';
import KgFlag from './resources/kg.svg';
import KhFlag from './resources/kh.svg';
import KiFlag from './resources/ki.svg';
import KmFlag from './resources/km.svg';
import KnFlag from './resources/kn.svg';
import KpFlag from './resources/kp.svg';
import KrFlag from './resources/kr.svg';
import KwFlag from './resources/kw.svg';
import KyFlag from './resources/ky.svg';
import KzFlag from './resources/kz.svg';
import LaFlag from './resources/la.svg';
import LbFlag from './resources/lb.svg';
import LcFlag from './resources/lc.svg';
import LiFlag from './resources/li.svg';
import LkFlag from './resources/lk.svg';
import LrFlag from './resources/lr.svg';
import LsFlag from './resources/ls.svg';
import LtFlag from './resources/lt.svg';
import LuFlag from './resources/lu.svg';
import LvFlag from './resources/lv.svg';
import LyFlag from './resources/ly.svg';
import MaFlag from './resources/ma.svg';
import McFlag from './resources/mc.svg';
import MdFlag from './resources/md.svg';
import MeFlag from './resources/me.svg';
import MfFlag from './resources/mf.svg';
import MgFlag from './resources/mg.svg';
import MhFlag from './resources/mh.svg';
import MkFlag from './resources/mk.svg';
import MlFlag from './resources/ml.svg';
import MmFlag from './resources/mm.svg';
import MnFlag from './resources/mn.svg';
import MoFlag from './resources/mo.svg';
import MpFlag from './resources/mp.svg';
import MqFlag from './resources/mq.svg';
import MrFlag from './resources/mr.svg';
import MsFlag from './resources/ms.svg';
import MtFlag from './resources/mt.svg';
import MuFlag from './resources/mu.svg';
import MvFlag from './resources/mv.svg';
import MwFlag from './resources/mw.svg';
import MxFlag from './resources/mx.svg';
import MyFlag from './resources/my.svg';
import MzFlag from './resources/mz.svg';
import NaFlag from './resources/na.svg';
import NcFlag from './resources/nc.svg';
import NeFlag from './resources/ne.svg';
import NfFlag from './resources/nf.svg';
import NgFlag from './resources/ng.svg';
import NiFlag from './resources/ni.svg';
import NlFlag from './resources/nl.svg';
import NoFlag from './resources/no.svg';
import NpFlag from './resources/np.svg';
import NrFlag from './resources/nr.svg';
import NuFlag from './resources/nu.svg';
import NzFlag from './resources/nz.svg';
import OmFlag from './resources/om.svg';
import PaFlag from './resources/pa.svg';
import PeFlag from './resources/pe.svg';
import PfFlag from './resources/pf.svg';
import PgFlag from './resources/pg.svg';
import PhFlag from './resources/ph.svg';
import PkFlag from './resources/pk.svg';
import PlFlag from './resources/pl.svg';
import PmFlag from './resources/pm.svg';
import PnFlag from './resources/pn.svg';
import PrFlag from './resources/pr.svg';
import PsFlag from './resources/ps.svg';
import PtFlag from './resources/pt.svg';
import PwFlag from './resources/pw.svg';
import PyFlag from './resources/py.svg';
import QaFlag from './resources/qa.svg';
import ReFlag from './resources/re.svg';
import RoFlag from './resources/ro.svg';
import RsFlag from './resources/rs.svg';
import RuFlag from './resources/ru.svg';
import RwFlag from './resources/rw.svg';
import SaFlag from './resources/sa.svg';
import SbFlag from './resources/sb.svg';
import ScFlag from './resources/sc.svg';
import SdFlag from './resources/sd.svg';
import SeFlag from './resources/se.svg';
import SgFlag from './resources/sg.svg';
import ShFlag from './resources/sh.svg';
import SiFlag from './resources/si.svg';
import SjFlag from './resources/sj.svg';
import SkFlag from './resources/sk.svg';
import SlFlag from './resources/sl.svg';
import SmFlag from './resources/sm.svg';
import SnFlag from './resources/sn.svg';
import SoFlag from './resources/so.svg';
import SrFlag from './resources/sr.svg';
import SsFlag from './resources/ss.svg';
import StFlag from './resources/st.svg';
import SvFlag from './resources/sv.svg';
import SxFlag from './resources/sx.svg';
import SyFlag from './resources/sy.svg';
import SzFlag from './resources/sz.svg';
import TcFlag from './resources/tc.svg';
import TdFlag from './resources/td.svg';
import TfFlag from './resources/tf.svg';
import TgFlag from './resources/tg.svg';
import ThFlag from './resources/th.svg';
import TjFlag from './resources/tj.svg';
import TkFlag from './resources/tk.svg';
import TlFlag from './resources/tl.svg';
import TmFlag from './resources/tm.svg';
import TnFlag from './resources/tn.svg';
import ToFlag from './resources/to.svg';
import TrFlag from './resources/tr.svg';
import TtFlag from './resources/tt.svg';
import TvFlag from './resources/tv.svg';
import TwFlag from './resources/tw.svg';
import TzFlag from './resources/tz.svg';
import UaFlag from './resources/ua.svg';
import UgFlag from './resources/ug.svg';
import UmFlag from './resources/um.svg';
import UsFlag from './resources/us.svg';
import UyFlag from './resources/uy.svg';
import UzFlag from './resources/uz.svg';
import VaFlag from './resources/va.svg';
import VcFlag from './resources/vc.svg';
import VeFlag from './resources/ve.svg';
import VgFlag from './resources/vg.svg';
import ViFlag from './resources/vi.svg';
import VnFlag from './resources/vn.svg';
import VuFlag from './resources/vu.svg';
import WfFlag from './resources/wf.svg';
import WsFlag from './resources/ws.svg';
import YeFlag from './resources/ye.svg';
import YtFlag from './resources/yt.svg';
import ZaFlag from './resources/za.svg';
import ZmFlag from './resources/zm.svg';
import ZwFlag from './resources/zw.svg';

// Defines the type for our flags object for better TypeScript support.
// It's a record where keys are strings (country codes) and values are
// React Function Components that accept SvgProps.

// TODO - remove any type
type FlagMap = Record<string, any>;

const flags: FlagMap = {
  ad: AdFlag,
  ae: AeFlag,
  af: AfFlag,
  ag: AgFlag,
  ai: AiFlag,
  al: AlFlag,
  am: AmFlag,
  ao: AoFlag,
  aq: AqFlag,
  ar: ArFlag,
  as: AsFlag,
  at: AtFlag,
  au: AuFlag,
  aw: AwFlag,
  ax: AxFlag,
  az: AzFlag,
  ba: BaFlag,
  bb: BbFlag,
  bd: BdFlag,
  be: BeFlag,
  bf: BfFlag,
  bg: BgFlag,
  bh: BhFlag,
  bi: BiFlag,
  bj: BjFlag,
  bl: BlFlag,
  bm: BmFlag,
  bn: BnFlag,
  bo: BoFlag,
  bq: BqFlag,
  br: BrFlag,
  bs: BsFlag,
  bt: BtFlag,
  bv: BvFlag,
  bw: BwFlag,
  by: ByFlag,
  bz: BzFlag,
  ca: CaFlag,
  cc: CcFlag,
  cd: CdFlag,
  cf: CfFlag,
  cg: CgFlag,
  ch: ChFlag,
  ci: CiFlag,
  ck: CkFlag,
  cl: ClFlag,
  cm: CmFlag,
  cn: CnFlag,
  co: CoFlag,
  cr: CrFlag,
  cu: CuFlag,
  cv: CvFlag,
  cw: CwFlag,
  cx: CxFlag,
  cy: CyFlag,
  cz: CzFlag,
  de: DeFlag,
  dj: DjFlag,
  dk: DkFlag,
  dm: DmFlag,
  do: DoFlag,
  dz: DzFlag,
  ec: EcFlag,
  ee: EeFlag,
  eg: EgFlag,
  eh: EhFlag,
  er: ErFlag,
  es: EsFlag,
  et: EtFlag,
  fi: FiFlag,
  fj: FjFlag,
  fk: FkFlag,
  fm: FmFlag,
  fo: FoFlag,
  fr: FrFlag,
  ga: GaFlag,
  gb: GbFlag,
  gd: GdFlag,
  ge: GeFlag,
  gf: GfFlag,
  gg: GgFlag,
  gh: GhFlag,
  gi: GiFlag,
  gl: GlFlag,
  gm: GmFlag,
  gn: GnFlag,
  gp: GpFlag,
  gq: GqFlag,
  gr: GrFlag,
  gs: GsFlag,
  gt: GtFlag,
  gu: GuFlag,
  gw: GwFlag,
  gy: GyFlag,
  hk: HkFlag,
  hm: HmFlag,
  hn: HnFlag,
  hr: HrFlag,
  ht: HtFlag,
  hu: HuFlag,
  id: IdFlag,
  ie: IeFlag,
  il: IlFlag,
  im: ImFlag,
  in: InFlag,
  io: IoFlag,
  iq: IqFlag,
  ir: IrFlag,
  is: IsFlag,
  it: ItFlag,
  je: JeFlag,
  jm: JmFlag,
  jo: JoFlag,
  jp: JpFlag,
  ke: KeFlag,
  kg: KgFlag,
  kh: KhFlag,
  ki: KiFlag,
  km: KmFlag,
  kn: KnFlag,
  kp: KpFlag,
  kr: KrFlag,
  kw: KwFlag,
  ky: KyFlag,
  kz: KzFlag,
  la: LaFlag,
  lb: LbFlag,
  lc: LcFlag,
  li: LiFlag,
  lk: LkFlag,
  lr: LrFlag,
  ls: LsFlag,
  lt: LtFlag,
  lu: LuFlag,
  lv: LvFlag,
  ly: LyFlag,
  ma: MaFlag,
  mc: McFlag,
  md: MdFlag,
  me: MeFlag,
  mf: MfFlag,
  mg: MgFlag,
  mh: MhFlag,
  mk: MkFlag,
  ml: MlFlag,
  mm: MmFlag,
  mn: MnFlag,
  mo: MoFlag,
  mp: MpFlag,
  mq: MqFlag,
  mr: MrFlag,
  ms: MsFlag,
  mt: MtFlag,
  mu: MuFlag,
  mv: MvFlag,
  mw: MwFlag,
  mx: MxFlag,
  my: MyFlag,
  mz: MzFlag,
  na: NaFlag,
  nc: NcFlag,
  ne: NeFlag,
  nf: NfFlag,
  ng: NgFlag,
  ni: NiFlag,
  nl: NlFlag,
  no: NoFlag,
  np: NpFlag,
  nr: NrFlag,
  nu: NuFlag,
  nz: NzFlag,
  om: OmFlag,
  pa: PaFlag,
  pe: PeFlag,
  pf: PfFlag,
  pg: PgFlag,
  ph: PhFlag,
  pk: PkFlag,
  pl: PlFlag,
  pm: PmFlag,
  pn: PnFlag,
  pr: PrFlag,
  ps: PsFlag,
  pt: PtFlag,
  pw: PwFlag,
  py: PyFlag,
  qa: QaFlag,
  re: ReFlag,
  ro: RoFlag,
  rs: RsFlag,
  ru: RuFlag,
  rw: RwFlag,
  sa: SaFlag,
  sb: SbFlag,
  sc: ScFlag,
  sd: SdFlag,
  se: SeFlag,
  sg: SgFlag,
  sh: ShFlag,
  si: SiFlag,
  sj: SjFlag,
  sk: SkFlag,
  sl: SlFlag,
  sm: SmFlag,
  sn: SnFlag,
  so: SoFlag,
  sr: SrFlag,
  ss: SsFlag,
  st: StFlag,
  sv: SvFlag,
  sx: SxFlag,
  sy: SyFlag,
  sz: SzFlag,
  tc: TcFlag,
  td: TdFlag,
  tf: TfFlag,
  tg: TgFlag,
  th: ThFlag,
  tj: TjFlag,
  tk: TkFlag,
  tl: TlFlag,
  tm: TmFlag,
  tn: TnFlag,
  to: ToFlag,
  tr: TrFlag,
  tt: TtFlag,
  tv: TvFlag,
  tw: TwFlag,
  tz: TzFlag,
  ua: UaFlag,
  ug: UgFlag,
  um: UmFlag,
  us: UsFlag,
  uy: UyFlag,
  uz: UzFlag,
  va: VaFlag,
  vc: VcFlag,
  ve: VeFlag,
  vg: VgFlag,
  vi: ViFlag,
  vn: VnFlag,
  vu: VuFlag,
  wf: WfFlag,
  ws: WsFlag,
  ye: YeFlag,
  yt: YtFlag,
  za: ZaFlag,
  zm: ZmFlag,
  zw: ZwFlag,
};

export default flags;
