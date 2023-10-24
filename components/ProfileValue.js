import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, icons, } from '../constants'

import { connect } from 'react-redux'

const ProfileValue = ({ appTheme, icon, label, value, onPress }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            height: 70,
            alignItems: 'center',
        }}
            onPress={onPress}
        >
            {/* Icon */}
            <View style={{
                width: 30, height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: appTheme?.backgroundColor3,
            }}>
                <Image source={icon}
                    style={{
                        width: 20, height: 20,
                        tintColor: COLORS.primary,
                        resizeMode: 'contain'
                    }}
                />
            </View>

            {/* Label & Value*/}
            <View style={{
                flex: 1,
                marginLeft: SIZES.radius,
            }}>
                {label && <Text style={{
                    color: COLORS.gray30,
                    ...FONTS.body4
                }}>
                    {label}
                </Text>}

                <Text style={{
                    color: appTheme?.textColor,
                    fontWeight: '700',
                    ...FONTS.h3
                }}>
                    {value}
                </Text>
            </View>

            {/* Icon */}
            <Image source={icons.right_arrow}
                style={{
                    width: 15, height: 15,
                    tintColor: appTheme?.tintColor
                }}
            />
        </TouchableOpacity>
    )
}

function mapStateProps(state) {
    return {
        appTheme: state.appTheme,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateProps, mapDispatchToProps)(ProfileValue);