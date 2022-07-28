import {mount} from 'calendar_generated/CalendarGeneratedApp'
import React, {useRef, useEffect} from 'react'

export default () => {
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current);
    },[]);

    return <div ref={ref} />
}