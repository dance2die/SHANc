import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #ffc633;
  margin: 0 auto;
  width: 100%;
  padding: 1.45rem 1.0875rem;
`

const BuildInfo = () => {
  const now = new Date()
  return <Container>Generated on {now.toUTCString()}</Container>
}

export default BuildInfo
