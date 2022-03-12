import React, { useEffect, useState } from 'react'
import { Header, Grid, Icon, List } from 'semantic-ui-react'
import './App.css'
import { TrackPad } from './components/TrackPad'
import audioSamplesList from './assets/audioSamples'

export const LOOP_TIME = 80

let intervalId: NodeJS.Timer

function App() {
  const [isLoopOn, setIsLoopOn] = useState(false)
  const [currentSecond, setCurrentSecond] = useState(0)
  useEffect(() => {
    if (isLoopOn) {
      intervalId = setInterval(() => {
        setCurrentSecond((prevState) => (prevState % LOOP_TIME) + 1)
      }, 100)
    } else {
      setCurrentSecond(0)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isLoopOn])

  return (
    <div className="App">
      <Header color="teal" as="h1">
        DJ Console
      </Header>
      <Header color="teal" as="h2">
        {(currentSecond / 10).toFixed(2)}
      </Header>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Icon
              name="play"
              size="massive"
              color="green"
              className="button"
              disabled={isLoopOn}
              onClick={() => setIsLoopOn(!isLoopOn)}
            />
          </Grid.Column>
          <Grid.Column>
            <Icon
              name="stop"
              size="massive"
              color="red"
              className="button"
              disabled={!isLoopOn}
              onClick={() => setIsLoopOn(!isLoopOn)}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <List>
              {audioSamplesList.map(({ data, id }) => (
                <List.Item key={id}>
                  <TrackPad audioSrc={data} currentSecond={currentSecond} isLoopOn={isLoopOn} />
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default App
