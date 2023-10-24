import { View, Text, Image, TouchableOpacity, Animated, } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

import { COLORS, FONTS, SIZES, icons, } from '../constants'

const ProfileRadioButton = ({ appTheme, icon, label, isSelected, onPress }) => {

    const radioAnimated = React.useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimated.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.gray40,COLORS.primary]
    })

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange:[0,17],
        outputRange:[COLORS.additionalColor4,COLORS.additionalColor13]
    })

    React.useEffect(() => {
        if (isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false
            }).start();

        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [isSelected])

    return (
        <View style={{
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

            {/* Label */}
            <View style={{
                flex: 1,
                marginLeft: SIZES.radius,
            }}>

                <Text style={{
                    color: appTheme?.textColor,
                    fontWeight: '700',
                    ...FONTS.h3
                }}>
                    {label}
                </Text>
            </View>

            {/* Radio Button */}
            <TouchableOpacity style={{
                width: 40, height: 30,
                alignItems: 'center',
                justifyContent: 'center',
            }}
                onPress={onPress}
            >
                <Animated.View
                    style={{
                        width: '100%',
                        height: 5,
                        borderRadius: 3,
                        backgroundColor: lineColorAnimated,
                    }}
                />

                <Animated.View
                    style={{
                        position: 'absolute',
                        left: radioAnimated,
                        height: 23, width: 23,
                        borderRadius: 15,
                        borderWidth: 5,
                        borderColor: circleColorAnimated,
                        backgroundColor: appTheme?.backgroundColor1,

                    }}
                />
            </TouchableOpacity>
        </View>
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

export default connect(mapStateProps, mapDispatchToProps)(ProfileRadioButton);