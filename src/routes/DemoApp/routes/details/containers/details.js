/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './details.css'

class details extends Component {
  render() {
    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        <h2>考勤管理规定</h2>
        <h3>一． 目的</h3>
        <p>为规范公司考勤制度，加强公司对假期的管理，特制定《考勤管理规定》。</p>
        <h3>二． 适用范围</h3>
        <p>小米全体正式员工（多看、小米网服务部及物流部的具体考勤操作以团队内部流程为准）</p>
        <p>本考勤制度自 2014 年 1 月 1 日起执行</p>
        <h3>三． 假期规定</h3>
        <h4>1. 请假规定</h4>
        <p>1.1 请假方式：员工请假须提前在小米 HR 管理平台（以下简称“系统”）中提起申请，待相应主管批准后方可休假。因急事无法办理请假手续者，当天上午须以电话/短信向直接主管和人力资源部备案，假期结束的第一个工作日内须补上假期申请，否则按照旷工处理。请连续超过 5 个工作日的假期时，应提前至少一周申请。</p>
        <p>1.2 批准权限：连续请假天数≤7 天：由直属主管审批；7 天＜连续请假天数≤14 天：直属主管审批后由二级部门主管审批；连续请假天数＞14 天：直属主管审批后由二级部门主管审批，审批结果由系统抄送合伙人。</p>
        <p>1.3 附加证明：员工在申请需要提供其他证明材料的假期时，应尽量在休假开始之前提供，最迟须在休假结束后第一个工作日内提交相应证明材料到人力资源部。逾期未提供者按事假处理。</p>
        <p>1.4 员工未按公司规定履行请假手续，假满不到职，未按时销假上班或续假未核准不到岗者，按旷工处理。</p>
        <p>1.5 所有请假须做好交接工作，确保工作连续性。</p>
        <p>1.6 非法定节假日休假期间的补助会按休假天数扣除。</p>
        <h4>2. 假期类别</h4>
        <h5>2.1 带薪年假</h5>
        <p>正式员工自入职之日起享有带薪年假。每年可享受年假依据司龄计算，入职第一自然年的带薪年假天数=当年累计工作月数*5/12，向上取整到 0.5 天，以后司龄每增加 1 自然年，当年享受的带薪年假增加 1 天，即第二年 6 天，第三年 7天，以此类推。带薪年假每年 12 月 31 日结算，当年未用，可顺延至下一年使用，过期作废。员工不可预支次年带薪年假。带薪年假期间全额发放基本工资。员工离职时，离职时可用带薪年假天数=上年未用带薪年假天数+(当年享受带薪年假天数*当年累计工作月数/12)，取整到 0.1 天；如果离职时已用带薪年假超出可用带薪年假，超出的部分将折合成工资扣回。</p>
        <h5>2.2 病假</h5>
        <p>正式员工发生疾病时可请病假。病假分为带薪病假、短期病假和长期病假。</p>
        <p>2.2.1 员工每月享受 1 天带薪病假，累计 12 天/年，仅当年有效。入职第一自然年带薪病假天数=当年累计工作月数。带薪病假期间全额发放基本工资。带薪病假年内可预支。员工离职时，公司将已预支的带薪病假天数按短期病假的工资标准扣回。</p>
        <p>2.2.2 短期病假是指员工患病或非因工负伤，休完当年带薪病假后仍须进行 22 个连续工作日及以下休息治疗的病假。短期病假期间发放 70%的基本工资。</p>
        <p>2.2.3 长期病假是指员工患病或非因工负伤，休完当年带薪病假后仍须停止工作进行 22 个连续工作日以上长期休养的情况。长期病假期间工资按当年当地规定的最低工资标准支付。短期病假不可用来抵扣长期病假。请 3 天及以上病假需提供正规医院开具的病假单至人力资源部备案，未提供病假单者将视为事假处理，扣除所有工资及补助。</p>
        <h5>2.3 事假</h5>
        <p>正式员工如需在上班时间处理私人事务可请事假。全年事假不得超过 14 个工作日。事假期间不发放工资。请事假者不可事后以其他假期抵扣。</p>
        <h5>2.4 婚假</h5>
        <p>正式员工加入公司后领取结婚证者，可申请婚假。符合晚婚年龄(女 23 周岁，男 25 周岁)的初婚者享受 10 个连续自然日的晚婚假（含节假日），未达晚婚年龄的初婚者享受 3 个连续自然日的婚假（含节假日）。加入公司后领取结婚证的再婚员工，根据国家规定享受 3 个连续自然日的婚假(含节假日)。若员工在上家公司工作期间领取结婚证且未休婚假，希望在入职后申请婚假，需取得部门主管和合伙人批准后，提供上家公司未休婚假证明原件（加盖上家公司公章）和结婚证复印件至人力资源部备案，方可申请婚假。婚假期间，全额发放基本工资。婚假须自结婚证上结婚日期起一年内一次连续休完，不可分段请休，过期自动作废。申请婚假者需提前提供结婚证复印件至人力资源部备案。</p>
        <h5>2.5 丧假及路途假</h5>
        <p>正式员工直系亲属(指父母或配偶父母、配偶、子女)去世可请休 3 个连续自然日的丧假，祖父母、外祖父母、兄弟姐妹去世可请休 1 个自然日的丧假。若前述亲属在外地去世，需要员工本人去外地料理丧事的，可根据路程远近给予路途假：往返车程时间≥12 小时，1 个自然日；往返车程时间≥24 小时，2 个连续自然日；往返车程时间≥36 小时，3 个连续自然日；路途假最长 3 个连续自然日。丧假和路途假期间，全额发放基本工资。员工申请丧假，须提供员工与逝者的亲属关系证明及逝者死亡证明复印件至人力资源部备案；如果还需申请路途假的，需在休假申请中明确标注往返车程时间及路途假天数。不能提供证明的丧假会按照事假处理；没有明确标注往返车程时间及路途假天数的路途假会按照事假处理。丧假和路途假须一次连续休完，不可分段请休。</p>
        <h5>2.6 产前检查假</h5>
        <p>怀孕女员工需要进行产前检查的，可以请休产前检查假。产前检查假原则上每月不应超过 4 次，如有特殊情况者，须提供正规医院证明至人力资源部。产前检查假期间全额发放基本工资。</p>
        <h5>2.7 流产假</h5>
        <p>符合生育津贴申领政策的女员工怀孕未满 4 个月流产者，根据医院诊断证明，享受 15 个连续自然日的流产假；满 4 个月流产者，根据医院诊断证明，享受 42 个连续自然日的流产假。流产假期间全额发放基本工资。流产假须一次连续休完，不可分段请休。申请流产假的员工需将结婚证、正规医院诊断证明和病假单的复印件提供至人力资源部备案。不符合生育津贴申领政策的流产员工，流产后假期按照病假规定处理。</p>
        <h5>2.8 产假</h5>
        <p>符合国家计划生育政策的女员工正常生育者，产假为 98 天（含产前假 15 天）；晚育者(24 周岁后生育第一胎)增加 30天；难产者增加 15 天；多胞胎生育者每多生育 1 个婴儿增加 15 天。产假期间全额发放基本工资。产假天数为连续自然日，须一次连续休完，不可分段请休。申请产假的员工需在休假前将结婚证、生育服务证、预产期证明或医院诊断证明的复印件提供至人力资源部备案，并在休假结束后提供出生证明复印件、诊断证明和出院证明至人力资源部。</p>
        <h5>2.9 哺乳时间</h5>
        <p>哺乳期女员工在婴儿一周岁以内每天享受一小时哺乳时间，生育多胞胎的，每多哺乳 1 个婴儿每天增加 1 小时哺乳时间。此假期无需在系统中申请，当天休完，过期作废，不可累积请休。</p>
        <h5>2.10陪产假</h5>
        <p>男员工在妻子生育后，可享受 7 个连续自然日的陪产假（含节假日）。陪产假期间全额发放基本工资。陪产假需在婴儿出生一个月之内一次连续休完，过期作废。申请陪产假的员工须将结婚证和出生证明的复印件提供至人力资源部备案。</p>
        <h5>2.11工伤假</h5>
        <p>正式员工发生工伤并获得劳动部门鉴定的，依据医院诊断时间休工伤假。工伤假期间全额发放基本工资。鉴于工伤鉴定流程一般较长，在工伤鉴定结果未出时，该假期按照病假规定处理，待工伤鉴定结果下发之后，会补回相应基本工资。申请工伤假须提供正规医院开具的病假单至人力资源部备案，未提供病假单者将按照事假处理。</p>
        <h5>2.12公共假日</h5>
        <p>元旦( 1 天 )、春节( 3 天 )、清明节（ 1 天 ）、国际劳动节（ 1 天 )、端午节（ 1 天 ）、中秋节（ 1 天 ）、国庆节（ 3 天 )。</p>
        <h3>四．补充定义</h3>
        <h4>旷工 - 符合以下任一条件者视为旷工：</h4>
        <p>1. 未按公司规定履行请假手续者；</p>
        <p>2. 假满不到职者；</p>
        <p>3. 未续假或续假未获批准擅自不到职者；</p>
        <p>4. 未经其部门主管批准而擅自不到公司的办公场所上班者；</p>
        <p>5. 擅自离开工作岗位、无合法理由拒绝履行职责/工作职务者；</p>
        <p>6. 擅自离职（有法定理由的除外）者。</p>
        <p>每旷工一日扣除两个工作日工资，连续旷工三日以上或累计旷工七日以上公司主动与其解除劳动关系；当日旷工超过二小时按半日计算，超过四小时按整日计算，不满二小时累计计算，超过半小时不满一小时按一小时计算，半小时以下按迟到处理，旷工累计满八小时按一日计算。</p>
        <h4>实习生假期 - 实习生不论因各种缘由请假，均视为事假，扣除当天实习补助和其他补助。</h4>
      </div>
    )
  }
}

export default CSSModules(details, styles)
