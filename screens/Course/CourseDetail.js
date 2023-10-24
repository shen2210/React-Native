import {
  View, Text, ImageBackground,
  TouchableOpacity, Animated, Keyboard
} from 'react-native'
import React from 'react'
import Video from 'react-native-video'

import { IconButton, LineDivider } from '../../components'
import { COLORS, SIZES, FONTS, icons, constants, dummyData } from '../../constants'
import CourseChapters from './CourseTabs/CourseChapters'
import CourseFiles from './CourseTabs/CourseFiles'
import CourseDiscussions from './CourseTabs/CourseDiscussions'

const course_details_tabs = constants.course_details_tabs.map((course_details_tabs) => ({
  ...course_details_tabs,
  ref: React.createRef()
}))

const TabIndicator = ({ measureLayout, scrollX }) => {

  const inputRange = course_details_tabs.map((_, i) => i * SIZES.width);

  const tabIndicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.width)
  })

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x)
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 0,
        height: 4,
        width: tabIndicatorWidth,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary,
        transform: [{
          translateX
        }]
      }}
    />
  )
}
const Tabs = ({ scrollX, onTabPress }) => {

  const [measureLayout, setMeasureLayout] = React.useState([]);
  const containerRef = React.useRef();

  React.useEffect(() => {
    let ml = [];

    course_details_tabs.forEach(course_details_tab => {
      course_details_tab?.ref?.current?.measureLayout(containerRef.current, (x, y, width, height) => {
        ml.push({ x, y, width, height })

        if (ml.length === course_details_tabs.length) {
          setMeasureLayout(ml)
        }
      })
    })
  }, [containerRef.current])

  return (
    <View
      ref={containerRef}
      style={{
        flex: 1,
        flexDirection: 'row',
      }}
    >
      {/* Tab Indicator */}
      {measureLayout.length > 0 && <TabIndicator
        measureLayout={measureLayout}
        scrollX={scrollX}
      />}

      {/* Tabs */}
      {course_details_tabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`Tab-${index}`}
            ref={item.ref}
            style={{
              flex: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={()=>{
              onTabPress(index)
            }}
          >
            <Text style={{
              fontWeight: 'bold',
              ...FONTS.h3,
              fontSize: 17,
            }}>{item.label}</Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const CourseDetail = ({ navigation, route }) => {

  const { selectedCourse } = route.params;

  const [playVideo, setPlayVideo] = React.useState(false);
  const flatListRef = React.useRef();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const onTabPress = React.useCallback(tabIndex => {
    flatListRef?.current?.scrollToOffset({
      offset: tabIndex * SIZES.width
    })
  })

  function renderHeaderComponents() {
    return (
      <>
        {/* Back */}
        <View style={{
          flex: 1,
        }}>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              height: 40, width: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>

        {/* Share & Favourite */}
        <View style={{
          flexDirection: 'row',
        }}>
          <IconButton
            icon={icons.media}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            containerStyle={{
              height: 40, width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <IconButton
            icon={icons.favourite_outline}
            iconStyle={{
              tintColor: COLORS.white,
            }}
            containerStyle={{
              height: 40, width: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      </>
    )
  }

  function renderHeader() {
    if (playVideo) {
      return (
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.radius,
            paddingBottom: SIZES.base,
            backgroundColor: COLORS.black,
            height: 70,
            alignItems: 'flex-end'
          }}
        >
          {renderHeaderComponents()}
        </View>
      )
    } else {
      return (
        <View style={{
          position: 'absolute',
          flexDirection: 'row',
          right: 0, left: 0,
          top: 20,
          paddingHorizontal: SIZES.padding,
          zIndex: 1,
        }}>
          {renderHeaderComponents()}
        </View>
      )
    }

  }

  function renderVideoSection() {
    return (
      <View style={{
        height: SIZES.height > 800 ? 250 : 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray90,
      }}>
        {/* Thumbnail */}
        <ImageBackground
          source={selectedCourse?.thumbnail}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%', width: '100%',
          }}
        >
          {/* Play Button */}
          <IconButton
            icon={icons.play}
            containerStyle={{
              height: 55, width: 55,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              backgroundColor: COLORS.primary,
            }}
            onPress={() => setPlayVideo(true)}
          />
        </ImageBackground>

        {playVideo && <Video
          source={{ uri: "https://youtu.be/m-fPta9iThQ" }}
          // source={dummyData?.sample_video_url}
          controls={true}
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: 0, right: 0,
            backgroundColor: COLORS.black,
          }}

        />}
      </View>
    )
  }

  function renderContent() {
    return (
      <View style={{ flex: 1 }}>
        {/* Tabs */}
        <View style={{
          height: 60,
        }}>
          <Tabs scrollX={scrollX}
            onTabPress={onTabPress}
          />
        </View>

        {/* Line Divider */}
        <LineDivider />

        {/* Content */}
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          keyboardDismissMode="on-drag"
          data={constants.course_details_tabs}
          keyExtractor={item => `CourseDetailTab-${item.id}`}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } }
          ], {
            useNativeDriver: false
          })}
          renderItem={({ item, index }) => {
            return (
              <View style={{
                width: SIZES.width
              }}>
                {index == 0 && <CourseChapters/>}
                {index == 1 && <CourseFiles/>}
                {index == 2 && <CourseDiscussions/>}

              </View>
            )
          }}
        />
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      {/* Header Bar*/}
      {renderHeader()}

      {/* Video */}
      {renderVideoSection()}

      {/* Content */}
      {renderContent()}
    </View>
  )
}

export default CourseDetail