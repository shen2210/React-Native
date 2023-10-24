import {
    View, Text, ScrollView,
    Image, 
} from 'react-native'
import React from 'react'

import {
    IconLabel,
    TextButton,
    HorizontalCourseCard,
    LineDivider,
} from '../../../components'

import { FlatList } from 'react-native-gesture-handler'

import { COLORS, FONTS, SIZES, images, icons, dummyData } from '../../../constants'

const CourseChapters = () => {

    function renderHeader() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                paddingHorizontal: SIZES.padding,
            }}>
                {/* Title */}
                <Text style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    ...FONTS.h2
                }}>{dummyData?.course_details?.title}</Text>

                {/* Students & Duration */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                    }}
                >
                    <Text style={{
                        color: COLORS.gray30,
                        ...FONTS.body4
                    }}>
                        {dummyData?.course_details?.number_of_students}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={dummyData?.course_details?.duration}
                        containerStyle={{
                            marginLeft: SIZES.radius
                        }}
                    />
                </View>

                {/* Instructor */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    alignItems: 'center',
                }}>
                    {/* Profile */}
                    <Image
                        source={images.profile}
                        style={{
                            height: 45,
                            width: 45,
                            borderRadius: 25,
                        }}
                    />

                    {/* Name & Title */}
                    <View style={{
                        flex: 1,
                        marginLeft: SIZES.base,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: COLORS.black,
                            fontWeight: 'bold',
                            ...FONTS.h3,
                        }}>
                            {dummyData?.course_details?.instructor?.name}
                        </Text>

                        <Text style={{
                            color: COLORS.black,
                            ...FONTS.body3,
                            fontSize: 12,
                        }}>
                            {dummyData?.course_details?.instructor?.title}
                        </Text>
                    </View>

                    {/* Text Button */}
                    <TextButton
                        containerStyle={{
                            height: 35, width: 80,
                            borderRadius: 20,
                        }}
                        label="Follow +"
                    />
                </View>
            </View>
        )
    }

    function renderChapter() {
        return (
            <View>
                {dummyData?.course_details?.videos.map((item, index) => {
                    return (
                        <View
                            key={`Videos-${index}`}
                            style={{
                                height: 70,
                                backgroundColor: item.is_playing ? COLORS.additionalColor11 : null,
                                alignItems: 'center'
                            }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                paddingHorizontal: SIZES.padding,
                                alignItems: 'center',
                                height: 70,
                            }}>
                                {/* Icon */}
                                <Image
                                    source={item?.is_complete ? icons.completed : item?.is_playing ? icons.play_1 : icons.lock}
                                    style={{
                                        height: 40, width: 40,
                                    }}
                                />

                                {/* Title & Duration */}
                                <View style={{
                                    flex: 1,
                                    marginLeft: SIZES.radius

                                }}>
                                    <Text style={{
                                        color: COLORS.black,
                                        fontWeight: '700',
                                        fontSize: 15,
                                    }}>
                                        {item?.title}
                                    </Text>

                                    <Text style={{
                                        color: COLORS.gray30,
                                        ...FONTS.body4,
                                    }}>
                                        {item?.duration}
                                    </Text>
                                </View>

                                {/* Size & Status */}
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    {/* Size */}
                                    <Text style={{
                                        color: COLORS.gray30,
                                        ...FONTS.body4,
                                    }}>
                                        {item?.size}
                                    </Text>

                                    {/* Status */}
                                    <Image
                                        source={item?.is_downloaded ? icons.completed : icons.download}
                                        style={{
                                            marginLeft: SIZES.base,
                                            height: 25, width: 25,
                                            tintColor: item?.is_lock ? COLORS.additionalColor4 : null
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Progress Bar */}
                            {item?.is_playing &&
                                <View style={{
                                    position: 'absolute',
                                    height: 4,
                                    left: 0,
                                    bottom: 0,
                                    width: item?.progress,
                                    backgroundColor: COLORS.primary,
                                }} />
                            }
                        </View>
                    )
                })}
            </View>
        )
    }

    function renderPolularCourses() {
        return (
            <View style={{
                marginTop: SIZES.padding,
            }}>
                {/* Section Header */}
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,
                }}>
                    <Text style={{
                        flex: 1,
                        color: COLORS.black,
                        fontWeight: '700',
                        ...FONTS.h2,
                    }}>
                        Popular Courses
                    </Text>

                    <TextButton
                        label="See All"
                        containerStyle={{
                            width: 80,
                            borderRadius: 30,
                            backgroundColor: COLORS.primary
                        }}
                    />
                </View>

                {/* Popular Courses List */}
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey="PolularCourses"
                    scrollEnabled={false}
                    keyExtractor={item => `PolularCourses-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                    }}
                    renderItem={({ item, index }) => (
                        <HorizontalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index == 0 ? SIZES.radius : SIZES.padding,
                            }}
                        />
                    )}
                    ItemSeparatorComponent={()=>(
                        <LineDivider/>
                    )}
                />
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            {renderHeader()}

            {/* Line Divider */}
            <LineDivider
                lineStyle={{
                    height: 1,
                    marginVertical: SIZES.radius
                }}
            />

            {/* Chapters */}
            {renderChapter()}

            {/* Polular Courses */}
            {renderPolularCourses()}
        </ScrollView>
    )
}

export default CourseChapters