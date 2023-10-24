import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, } from '../constants'

const TextButton = ({ containerStyle, onPress, label, labelStyle, disabled }) => {
    return (
        <TouchableOpacity style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.primary,
            ...containerStyle,
        }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{
                color: COLORS.white,
                ...FONTS.h3,
                ...labelStyle,
            }}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TextButton