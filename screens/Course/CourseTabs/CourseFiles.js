import { View, Text, Image, ScrollView, } from 'react-native'
import React from 'react'

import {
    IconButton, TextButton,
} from '../../../components'

import { COLORS, FONTS, SIZES, icons, dummyData } from '../../../constants'

const CourseFiles = () => {

    function renderStudents() {
        let students = [];

        if (dummyData?.course_details?.students.length > 3) {
            students = dummyData?.course_details?.students.slice(0, 3);
        } else {
            students = dummyData?.course_details?.students;
        }

        return (
            <View>
                {/* Tittle */}
                <Text style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    ...FONTS.h2
                }}>Students</Text>

                {/* Students */}
                <View style={{
                    flexDirection: 'row',
                    marginTop: SIZES.radius,
                    alignItems: 'center',
                }}>
                    {students.map((item, index) => {
                        return (
                            <View
                                key={`Student-${index}`}
                                style={{
                                    marginLeft: index > 0 ? SIZES.radius : 0
                                }}
                            >
                                <Image
                                    source={item?.thumbnail}
                                    style={{
                                        width: 80, height: 80
                                    }}
                                />
                            </View>
                        )
                    })}

                    {dummyData?.course_details?.students.length > 3 &&
                        <TextButton
                            label="View All"
                            labelStyle={{
                                color: COLORS.primary,
                            }}
                            containerStyle={{
                                backgroundColor: null,
                                marginLeft: SIZES.radius
                            }}
                        />}
                </View>
            </View>
        )
    }

    function renderFiles() {
        return (
            <View style={{ marginTop: SIZES.padding }}>
                {/* Title */}
                <Text style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    ...FONTS.h2
                }}>Files</Text>

                {/* Files */}
                {dummyData?.course_details?.files.map((item, index) => {
                    return (
                        <View
                            key={`Files-${index}`}
                            style={{
                                flexDirection: 'row',
                                marginTop: SIZES.radius,
                            }}
                        >
                            {/* Thumbnail */}
                            <Image
                                source={item?.thumbnail}
                                style={{
                                    width: 80, height: 80
                                }}
                            />

                            {/* Name, author & date */}
                            <View style={{
                                flex: 1,
                                marginLeft: SIZES.radius,
                            }}>
                                <Text style={{
                                    color: COLORS.black,
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                }}>{item?.name}</Text>

                                <Text style={{
                                    color: COLORS.gray30,
                                    ...FONTS.body4
                                }}>
                                    {item?.author}
                                </Text>

                                <Text style={{
                                    color: COLORS.black,
                                    ...FONTS.body4, 
                                }}>
                                    {item?.upload_date}
                                </Text>
                            </View>

                            {/* Menu */}
                            <IconButton
                                icon={icons.menu}
                                iconStyle={{
                                    tintColor: COLORS.black,
                                }}
                                containerStyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 25
                                }}
                            />
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{
                padding: SIZES.padding,
            }}
            showsVerticalScrollIndicator={false}>

            {/* Students */}
            {renderStudents()}

            {/* Files */}
            {renderFiles()}

        </ScrollView>
    )
}

export default CourseFiles