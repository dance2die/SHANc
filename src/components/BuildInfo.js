import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  background: #ffc633;
  margin: 0 auto;
  width: 100%;
  padding: 1.45rem 1.0875rem;
`

const BuildInfo = ({ metadata }) => {
  const { buildDate } = metadata
  const builtOn = new Date(buildDate * 1000)
  return <Container>Generated on {builtOn.toUTCString()}</Container>
}

BuildInfo.propTypes = {
  metadata: PropTypes.object.isRequired,
}

export default BuildInfo
