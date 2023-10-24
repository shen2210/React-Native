import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import { FONTS, SIZES, COLORS } from '../constants'

const IconLabelButton = ({ containerStyle, icon, iconStyle, label, labelStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                    width: 20, height: 20,
                    ...iconStyle
                }}
            />

            <Text style={{
                marginLeft: SIZES.base,
                color: COLORS.black,
                ...FONTS.body3,
                ...labelStyle
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default IconLabelButton