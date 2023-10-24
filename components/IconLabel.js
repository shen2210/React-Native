import { View, Text, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, } from '../constants'

const IconLabel = ({ containerStyle, icon, iconStyle, label, labelStyle }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            ...containerStyle,
        }}>
            <Image source={icon}
                style={{
                    height: 15,
                    width: 15, 
                    tintColor: COLORS.gray30,
                    ...iconStyle
                }}
                resizeMode='contain'
            />
            <Text style={{
                marginLeft: SIZES.base,
                color: COLORS.gray30,
                ...FONTS.body4,
                ...labelStyle
            }}>{label}</Text>
        </View>
    )
}

export default IconLabel