import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const IconButton = ({ icon, iconStyle, containerStyle, onPress }) => {
    return (
        <TouchableOpacity style={{
            ...containerStyle,
        }}
            onPress={onPress}
        >
            <Image source={icon}
                resizeMode='contain'
                style={{
                    height: 25,
                    width: 25,
                    tintColor: COLORS.white,
                    ...iconStyle,
                }} />
        </TouchableOpacity>
    )
}

export default IconButton