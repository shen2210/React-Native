import { View, Text, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import { COLORS, FONTS, icons, SIZES, } from '../constants'

import { IconLabel } from '../components'

const VerticalCourseCard = ({ containerStyle, course }) => {
    return (
        <TouchableOpacity style={{
            height: 230,
            width: 280,
            ...containerStyle,
        }}>
            {/* Thumbnail */}
            <Image source={course?.thumbnail}
                style={{
                    height: 150, width: 250,
                    marginBottom: SIZES.radius,
                    borderRadius: SIZES.radius,
                }}
                resizeMode='cover'
            />
            {/* Details */}
            <View style={{
                flexDirection: 'row',
                // flex: 1,
            }}>
                {/* Play */}
                <View style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: COLORS.primary,
                }}>
                    <Image source={icons.play}
                        style={{
                            height: 15,
                            width: 15,
                        }}
                        resizeMode='contain'
                    />
                </View>

                {/* Info */}
                <View style={{
                    flexShrink: 1,
                    paddingHorizontal: SIZES.radius,
                }}>
                    <Text style={{
                        ...FONTS.h3,
                        color: COLORS.black,
                        fontWeight: '700',
                        // width: '90%'
                    }}>
                        {course.title}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={{
                            marginTop: 4,
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalCourseCard