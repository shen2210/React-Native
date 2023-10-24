import {
    View, Text, ImageBackground,
    TouchableOpacity, Image,
    StyleSheet,
} from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element';

import { COLORS, FONTS, SIZES, } from '../constants'

const CategoryCard = ({ sharedElementPrefix, category, containerStyle, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                height: 150, width: 200,
                ...containerStyle
            }}
            onPress={onPress}>
                
            {/* <ImageBackground
                source={category?.thumbnail}
                resizeMode='cover'
                style={{
                    height: 150, width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end',
                    ...containerStyle
                }}
            >
                <Text style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                }}>{category.title}</Text>
            </ImageBackground> */}

            {/* Image Background */}
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={category?.thumbnail}
                    resizeMode='cover'
                    style={{
                        height: '100%', width: '100%',
                        borderRadius: SIZES.radius,
                    }}
                />
            </SharedElement>

            {/* Title */}
            <View style={{
                position: 'absolute',
                bottom: 50,
                left: 5,
            }}>
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text style={{
                        position: 'absolute',
                        color: COLORS.white,
                        ...FONTS.h2,
                    }}>{category?.title}</Text>
                </SharedElement>

            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard