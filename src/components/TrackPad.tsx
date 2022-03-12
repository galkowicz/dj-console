import React, { useState, useRef, useEffect } from 'react'
import { Grid, Icon, Progress } from 'semantic-ui-react'
import { Gapless5 } from '@regosen/gapless-5'
import { LOOP_TIME } from '../App'

type Props = {
  audioSrc: string
  currentSecond: number
  isLoopOn?: boolean
}

const TrackPad = ({ audioSrc, currentSecond, isLoopOn = false }: Props) => {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    audioRef.current = new Gapless5({ loop: true, tracks: audioSrc })
  }, [audioSrc])

  useEffect(() => {
    if (audioRef.current === null) return
    if (!isPlaying && isLoopOn && isReady && currentSecond === 1) {
      // @ts-ignore
      audioRef.current.play()
      console.log('play')
      setIsPlaying(true)
    }
    if ((!isReady || !isLoopOn) && isPlaying) {
      // @ts-ignore
      audioRef.current.prev() // using prev because stop() doesn't reset track
      // @ts-ignore
      audioRef.current.stop()
      console.log('stopped')
      setIsPlaying(false)
    }
  }, [isLoopOn, isReady, currentSecond, isPlaying])


  return (
    <Grid columns={2}>
      <Grid.Row textAlign="center">
        <Grid.Column verticalAlign="middle">
          <Progress
            inverted
            color="orange"
            className="progress-bar"
            total={LOOP_TIME}
            value={isPlaying ? currentSecond : 1}
          />
        </Grid.Column>
        <Grid.Column>
          <Icon
            name={isReady ? 'toggle on' : 'toggle off'}
            size="huge"
            color="blue"
            onClick={() => setIsReady(!isReady)}
            className="button"
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export { TrackPad }
