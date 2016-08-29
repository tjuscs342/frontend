import React from 'react'

export const createCustomizedComponent = {
  links: (formConfig, formState, formActions) => {
    const config = formConfig.links
    return (
      <div className="fs12" key="links" style={{ marginBottom: '15px' }}>
        <span style={{ marginRight: '15px', fontSize: '14px' }}>{config.label}</span>
        <a href={config.link} target="_blank" style={{ textDecoration: 'underline', fontSize: '14px' }}>{config.name}</a>
      </div>
    )
  }
}
