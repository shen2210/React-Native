import { View, Text, Image, FlatList, StyleSheet, } from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element';

import Animated, {
    useSharedValue,
    Extrapolate, interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    withDelay,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

import { COLORS, SIZES, FONTS, icons, images, dummyData } from '../../constants'
import {
    IconButton, LineDivider,
    HorizontalCourseCard,
    FilterModal,
} from '../../components'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const HEADER_HEIGHT = 180;

const CourseListing = ({ navigation, route }) => {

    const { category, sharedElementPrefix } = route.params;

    const flatListRef = React.useRef();
    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((e) => {
        scrollY.value = e.contentOffset.y;
    })

    const headerSharedValue = useSharedValue(80);
    const filterModalSharedValue1 = useSharedValue(SIZES.height);
    const filterModalSharedValue2 = useSharedValue(SIZES.height);

    // Handler
    function backHandler() {
        navigation.goBack();
    }

    // Render
    function renderHeader() {

        const inputRange = [0, HEADER_HEIGHT - 50];

        headerSharedValue.value = withDelay(500,
            withTiming(0, {
                duration: 500
            })
        )

        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1])

            }
        })

        const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{
                    translateY: headerSharedValue.value
                }]

            }
        })

        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 80], Extrapolate.CLAMP),
            }
        })

        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, 130], Extrapolate.CLAMP),
                    }
                ]
            }
        })

        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, 30], Extrapolate.CLAMP),
                    }
                ]
            }
        })

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 180,
                    overflow: 'hidden',
                }, headerHeightAnimatedStyle]}
            >
                {/* Bg Image */}
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={category?.thumbnail}
                        resizeMode='cover'
                        style={{
                            height: '100%', width: '100%',
                            borderBottomLeftRadius: 60,
                        }}
                    />
                </SharedElement>

                {/* Title */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        left: 0, right: 0,
                        top: -10,
                    }, headerShowOnScrollAnimatedStyle]}
                >
                    <Text style={{
                        // position: 'absolute',
                        color: COLORS.white,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        ...FONTS.h2,
                    }}>{category?.title}</Text>
                </Animated.View>

                <Animated.View style={[{
                    position: 'absolute',
                    bottom: 60,
                    left: 30,
                }, headerHideOnScrollAnimatedStyle]}>
                    {/* SharedElement chia sẻ phần tử giữa các màn hình */}
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text style={{
                            position: 'absolute',
                            color: COLORS.white,
                            fontWeight: 'bold',
                            ...FONTS.h1,
                        }}>{category?.title}</Text>
                    </SharedElement>
                </Animated.View>

                {/* Back */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            position: 'absolute',
                            top: 10,
                            left: 20,
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.white,
                            borderRadius: 20
                        }}
                        onPress={() => {
                            if (scrollY.value > 0 && scrollY.value <= 130) {
                                flatListRef.current?.scrollToOffset({
                                    offset: 0,
                                    animated: true
                                })

                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(80, {
                                        duration: 500
                                    }, () => {
                                        runOnJS(backHandler)();
                                    })
                                }, 100)
                            } else {
                                backHandler()

                            }
                        }}
                    />
                </Animated.View>

                {/* Category Image */}
                <Animated.Image
                    source={images.mobile_image}
                    resizeMode='contain'
                    style={[{
                        position: 'absolute',
                        bottom: -40,
                        right: 40,
                        height: 180,
                        width: 100,
                    }, headerFadeAnimatedStyle,
                        headerTranslateAnimatedStyle,
                        headerHideOnScrollAnimatedStyle
                    ]}
                />
            </Animated.View>
        )
    }

    function renderResults() {
        return (
            <AnimatedFlatList
                ref={flatListRef}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                }}
                data={dummyData.courses_list_2}
                keyExtractor={item => `Results-${item.id}`}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                onScroll={onScroll}
                ListHeaderComponent={
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 200,
                        marginBottom: SIZES.base,
                        paddingHorizontal: SIZES.padding
                    }}>
                        {/* Results */}
                        <Text style={{
                            color: COLORS.black,
                            flex: 1,
                            ...FONTS.body3,
                        }}>5,761 Results</Text>

                        {/* Filter Button */}
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                height: 18,
                                width: 18,
                            }}
                            containerStyle={{
                                height: 35,
                                width: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: COLORS.primary,
                                borderRadius: 10
                            }}
                            onPress={() => {
                                // withTiming: thay đổi giá trị của một biến từ giá trị hiện tại đến một giá trị mới trong khoảng thời gian xác định.
                                filterModalSharedValue1.value = withTiming(0, {
                                    duration: 100
                                })

                                // withDelay: trễ 100 miligiây (0.1 giây) trước khi bắt đầu animation tiếp theo
                                filterModalSharedValue2.value = withDelay(100,
                                    withTiming(0, {
                                        duration: 500
                                    }))
                            }}
                        />
                    </View>
                }
                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                        }}
                        onPress={() => navigation.navigate("CourseDetail", { selectedCourse: item })}
                    />
                )}
                ItemSeparatorComponent={() => (
                    <LineDivider />
                )}
            />
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            {/* Results */}
            {renderResults()}

            {/* Header */}
            {renderHeader()}

            {/* Filter Modal */}
            <FilterModal
                filterModalSharedValue1={filterModalSharedValue1}
                filterModalSharedValue2={filterModalSharedValue2}
            />
        </View>
    )
}

CourseListing.sharedElements = (route, otherRoute, showing) => {
    if(otherRoute.name === "Dashboard"){
        const { category, sharedElementPrefix } = route.params;

    return [
        {
            id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`
        },
        {
            id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`

        }

    ]
    }
}

export default CourseListing