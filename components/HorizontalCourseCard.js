import { View, Text, Image, ImageBackground, TouchableOpacity, } from 'react-native'
import React from 'react'

import { IconLabel } from '../components'
import { COLORS, FONTS, SIZES, icons, } from '../constants'

const HorizontalCourseCard = ({ containerStyle, course, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                ...containerStyle
            }}
            onPress={onPress}
        >
            {/* Thumbnail */}
            <ImageBackground
                source={course?.thumbnail}
                resizeMode='cover'
                style={{
                    height: 130, width: 130,
                    marginBottom: SIZES.radius,
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <View style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    width: 25, height: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: COLORS.white,
                }}>
                    <Image source={icons.favourite}
                        resizeMode='contain'
                        style={{
                            width: 15, height: 15,
                            tintColor: course?.is_favourite ? COLORS.secondary : COLORS.additionalColor4,
                        }}
                    />
                </View>
            </ImageBackground>

            {/* Details */}
            <View style={{
                flex: 1,
                marginLeft: SIZES.base,
            }}>
                {/* Title */}
                <Text style={{
                    color: COLORS.black,
                    fontWeight: '700',
                    ...FONTS.h3,
                    fontSize: 18,
                }}>{course.title}</Text>

                {/* Instructor & Duration */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: COLORS.black,
                        ...FONTS.body4,
                    }}>
                        By {course?.instructor}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={course?.duration}
                        containerStyle={{
                            marginLeft: SIZES.base,
                        }}
                    />
                </View>

                {/* Price & Rating */}
                <View style={{
                    flexDirection: 'row', 
                    marginTop: SIZES.base,
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: COLORS.primary,
                        ...FONTS.h2,
                        fontWeight: '700',
                    }}>
                        ${course?.price.toFixed(2)}
                    </Text>

                    <IconLabel
                        icon={icons.star}
                        iconStyle={{
                            tintColor: COLORS.primary2,
                        }}
                        label={course?.ratings}
                        labelStyle={{
                            color: COLORS.black,
                            ...FONTS.h3,
                            marginLeft: 5,
                        }}
                        containerStyle={{
                            marginLeft: 8,
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalCourseCard