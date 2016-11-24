export default function audit(host) {
  return {
    loadAuditList: `${host}/audit/auditlist.do`,
    audit: `${host}/audit/auditapply.do`
  }
}
