import { View, Text } from 'react-native'
import React from 'react'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { COLORS, SIZES, FONTS } from '../constants'

const TwoPointSlider = ({ values, min, max, prefix, postfix, onValuesChange }) => {
    return (
        <MultiSlider
            values={values}
            sliderLength={SIZES.width - (SIZES.padding * 2) - 30}
            min={min}
            max={max}
            step={1} // bước nhảy 
            markerOffsetY={15}
            selectedStyle={{
                height: 2,
                backgroundColor: COLORS.primary,
            }}
            trackStyle={{
                height: 1,
                borderRadius: 10,
                backgroundColor: COLORS.gray30,
            }}
            // Hàm trả về giao diện tùy chỉnh của marker
            customMarker={(e) => {
                return (
                    <View style={{
                        height: 60,
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            height: 15,
                            width: 15,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.white,
                        }} />

                        <Text style={{
                            color: COLORS.gray80,
                            marginTop: 5,
                            ...FONTS.body3,
                        }}>{prefix}{e.currentValue} {postfix}</Text>
                    </View>
                )
            }}
            onValuesChange={(values) => onValuesChange(values)}
        />
    )
}

export default TwoPointSlider