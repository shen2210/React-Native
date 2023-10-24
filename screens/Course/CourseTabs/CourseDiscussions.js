import {
    View, Text, TextInput,
    Keyboard, FlatList, Image,
} from 'react-native'
import React from 'react'

import {
    IconButton, TextButton, IconLabelButton,
} from '../../../components'
import { COLORS, FONTS, SIZES, icons, dummyData, images } from '../../../constants'

const CommentSection = ({ commentItem, commentOption, replies }) => {
    return (
        <View style={{
            flexDirection: 'row',
            marginTop: SIZES.padding,
        }}>
            {/* Profile Photo */}
            <Image source={commentItem.profile}
                style={{
                    width: 40, height: 40,
                    borderRadius: 20
                }}
            />

            {/* Name & Comment */}
            <View style={{
                flex: 1,
                marginTop: 3,
                marginLeft: SIZES.radius
            }}>
                {/* Name */}
                <Text style={{
                    color: COLORS.black,
                    fontWeight: '700',
                    ...FONTS.h3
                }}>{commentItem?.name}</Text>

                {/* Comment */}
                <Text style={{
                    color: COLORS.black,
                    ...FONTS.body4
                }}>{commentItem?.comment}</Text>

                {/* Comment Options */}
                {commentOption}

                {/* Replies section */}
                {replies}
            </View>
        </View>
    )
}

const CourseDiscussions = () => {

    const [footerPosition, setFooterPosition] = React.useState(0);
    const [footerHeight, setFooterHeight] = React.useState(60);

    React.useEffect(() => {
        // Listen to the Keyboard
        const showSubscription = Keyboard.addListener("keyboardWillShow", (e) => {
            setFooterPosition(e.endCoordinates.height)
        })

        const hideSubscription = Keyboard.addListener("keyboardWillHide", (e) => {
            setFooterPosition(0)
        })

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [])

    function renderDiscussions() {
        return (
            <View style={{
                flex: 1,
            }}>
                <FlatList
                    data={dummyData?.course_details?.discussions}
                    keyExtractor={item => `Discussions-main-${item.id}`}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding,
                        paddingBottom: 70,
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <CommentSection
                            commentItem={item}
                            commentOption={
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius,
                                    paddingVertical: SIZES.base,
                                    borderTopWidth: 1,
                                    borderBottomWidth: 1,
                                    borderColor: COLORS.gray20
                                }}>
                                    {/* Comment */}
                                    <IconLabelButton
                                        icon={icons.comment}
                                        label={item?.no_of_comments}
                                        iconStyle={{
                                            width: 20, height: 20,
                                            tintColor: COLORS.black
                                        }}
                                        labelStyle={{
                                            marginLeft: 5,
                                            color: COLORS.black,
                                            fontWeight: '700',
                                            ...FONTS.h4
                                        }}
                                    />

                                    {/* Like */}
                                    <IconLabelButton
                                        icon={icons.heart}
                                        label={item?.no_of_likes}
                                        iconStyle={{
                                            width: 20, height: 20,
                                        }}
                                        labelStyle={{
                                            marginLeft: 5,
                                            color: COLORS.black,
                                            fontWeight: '700',
                                            ...FONTS.h4
                                        }}
                                        containerStyle={{
                                            marginLeft: SIZES.radius,
                                        }}
                                    />

                                    {/* Date */}
                                    <Text style={{
                                        flex: 1,
                                        textAlign: 'right',
                                        color: COLORS.black,
                                        fontWeight: '700',
                                        ...FONTS.h4
                                    }}>{item?.posted_on}</Text>
                                </View>
                            }
                            replies={
                                <FlatList
                                    data={item?.replies}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => `Discussions-replies-${item.id}`}
                                    renderItem={({ item, index }) => (
                                        <CommentSection
                                            commentItem={item}
                                            commentOption={
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginTop: SIZES.radius,
                                                    paddingVertical: SIZES.base,
                                                    borderTopWidth: 1,
                                                    borderBottomWidth: 1,
                                                    borderColor: COLORS.gray20
                                                }}>
                                                    {/* Reply */}
                                                    <IconLabelButton
                                                        icon={icons.reply}
                                                        label="Reply"
                                                        iconStyle={{
                                                            width: 20, height: 20,
                                                            tintColor: COLORS.black
                                                        }}
                                                        labelStyle={{
                                                            marginLeft: 5,
                                                            color: COLORS.black,
                                                            fontWeight: '700',
                                                            ...FONTS.h4
                                                        }}
                                                    />

                                                    {/* Like */}
                                                    <IconLabelButton
                                                        icon={icons.heart_off}
                                                        label="Like"
                                                        iconStyle={{
                                                            width: 20, height: 20,
                                                        }}
                                                        labelStyle={{
                                                            marginLeft: 5,
                                                            color: COLORS.black,
                                                            fontWeight: '700',
                                                            ...FONTS.h4
                                                        }}
                                                        containerStyle={{
                                                            marginLeft: SIZES.radius,
                                                        }}
                                                    />

                                                    {/* Date */}
                                                    <Text style={{
                                                        flex: 1,
                                                        textAlign: 'right',
                                                        color: COLORS.black,
                                                        fontWeight: '700',
                                                        ...FONTS.h4
                                                    }}>{item?.posted_on}</Text>
                                                </View>
                                            }
                                        />
                                    )}
                                />
                            }
                        />
                    )}
                />
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    position: 'absolute',
                    flexDirection: 'row',
                    bottom: footerPosition,
                    right: 0,
                    left: 0,
                    height: footerHeight,
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.base,
                    backgroundColor: COLORS.gray10
                }}
            >
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: SIZES.base,
                        ...FONTS.body3
                    }}
                    multiline
                    placeholder="Type Something"
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event) => {
                        const height = event.nativeEvent.contentSize.height;

                        if (height <= 60) {
                            setFooterHeight(60)
                        } else if (height > 60 && height <= 100) {
                            setFooterHeight(height)
                        } else setFooterHeight(100)
                    }}
                />

                <IconButton
                    icon={icons.send}
                    containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    iconStyle={{
                        tintColor: COLORS.primary,
                    }}
                />
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white,
        }}>
            {/* Discussions */}
            {renderDiscussions()}

            {/* Footer */}
            {renderFooter()}
        </View>
    )
}

export default CourseDiscussions    
