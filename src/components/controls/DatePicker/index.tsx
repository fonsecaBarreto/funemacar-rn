import * as React from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Button } from 'react-native';

export const DatePicker: React.FunctionComponent<any> = ({ onChange, value }) =>{
    const [ show, setShow ] = React.useState<boolean>(false)

    const handleChange = ( event: any, selectedDate: any ) =>{
        setShow(false);
        const currentDate = selectedDate;
        onChange(currentDate);
    }

    return (
        <React.Fragment>
            { show && <DateTimePicker
                value={value}
                mode={'time'}
                is24Hour={true}
                onChange={handleChange}
            /> }
            <Button color={"#aaa"}  title={value.getHours()+" : "+value.getMinutes()} onPress={()=>setShow(true)}>  </Button>
        </React.Fragment>
    )

}