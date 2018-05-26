import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  margin: 0 auto 10px;
  max-width: 960px;
  padding-left: 0;
`

const ListItem = styled.li`
  margin: 0 5px;
`

const Navigation = () => (
  <List>
    <ListItem>
      <Link to="/">Top</Link>
    </ListItem>
    <ListItem>
      <Link to="/new">New</Link>
    </ListItem>
    <ListItem>
      <Link to="/best">Best</Link>
    </ListItem>
  </List>
)

export default Navigation
