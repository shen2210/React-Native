import { View, Text, Image, TextInput, } from 'react-native'
import React from 'react'

import { Shadow } from 'react-native-shadow-2'
import { FlatList } from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'

import Animated, {
  useSharedValue,
  Extrapolate, interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { TextButton, CategoryCard, } from '../../components'
import { COLORS, SIZES, FONTS, icons, images, dummyData } from '../../constants'

const Search = () => {
  const navigation = useNavigation();

  const scrollViewRef = React.useRef();
  const scrollY = useSharedValue(0);

  // useAnimatedScrollHandler : tạo 1 hàm xử lý sự kiện cuộn 
  // e.contentOffset.y đại diện cho vị trí dọc (theo trục y) hiện tại

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  function renderTopSearches() {
    return (
      <View style={{ marginTop: SIZES.padding, }}>
        <Text style={{
          marginHorizontal: SIZES.padding,
          color: COLORS.black,
          fontWeight: 'bold',
          ...FONTS.h2,
        }}>
          Top Searches
        </Text>

        <FlatList
          horizontal
          data={dummyData.top_searches}
          listKey='TopSearches'
          keyExtractor={item => `TopSearches-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.label}
              containerStyle={{
                paddingHorizontal: SIZES.radius,
                paddingVertical: SIZES.base,
                backgroundColor: COLORS.gray10,
                borderRadius: SIZES.radius,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                marginRight: index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
              }}
              labelStyle={{
                color: COLORS.gray50,
              }}
            />
          )}
        />
      </View>
    )
  }

  function renderBrowseCategories() {
    return (
      <View style={{ marginTop: SIZES.padding, }}>
        <Text style={{
          marginHorizontal: SIZES.padding,
          color: COLORS.black,
          fontWeight: 'bold',
          ...FONTS.h2,
        }}>
          Browse Categories
        </Text>

        <FlatList
          numColumns={2}
          data={dummyData.categories}
          scrollEnabled={false}
          listKey='BrowseCategories'
          keyExtractor={item => `BrowseCategories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
            
              category={item}
              containerStyle={{
                height: 130,
                width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
                marginTop: SIZES.radius,
                borderRadius: SIZES.radius,
                marginLeft: (index + 1) % 2 != 0 ? SIZES.padding : SIZES.radius,
              }}
              onPress={()=>navigation.navigate("CourseListing",{
                category: item,
                sharedElementPrefix:"Search"
              })}
            />
          )}
        />
      </View>
    )
  }

  function renderSearchBar() {

    const inputRange = [0, 45];

    /* Extrapolate.CLAMP đồng nghĩa với việc giá trị đầu ra sẽ được giữ nguyên ở giới hạn đầu ra khi giá trị đầu vào vượt ngoài khoảng đầu vào.*/

    const searchBarAnimatedStyles = useAnimatedStyle(() => {
      return {
        height: interpolate(scrollY.value, inputRange, [45, 0], Extrapolate.CLAMP),
        opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP)

      }
    })

    return (
      <Animated.View
        style={
          [
            {
              position: 'absolute',
              top: 20,
              left: 0,
              height: 40,
              paddingHorizontal: SIZES.padding,
            },
            searchBarAnimatedStyles,
          ]
        }
      >
        <Shadow>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width - SIZES.padding * 2,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
          }}>
            <Image source={icons.search} style={{
              height: 20, width: 20,
              tintColor: COLORS.gray40,
            }} />

            <TextInput
              value=''
              style={{
                flex: 1,
                marginLeft: SIZES.base,
                ...FONTS.h4,
              }}
              placeholder="Search for Topics, Courses & Educators"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        </Shadow>
      </Animated.View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <Animated.ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          paddingBottom: 180,
          marginTop: 50,
        }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        onScroll={scrollHandler}
        onScrollEndDrag={(event) => { // kết thúc thao tác cuộn
          if (event.nativeEvent.contentOffset.y > 10 && event.nativeEvent.contentOffset.y < 40) {
            scrollViewRef.current?.scrollTo({
              x: 0,
              y: 50,
              animated: true,
            })
          }
        }}
      >
        {/* Top Searches */}
        {renderTopSearches()}

        {/* Browse Categories */}
        {renderBrowseCategories()}
      </Animated.ScrollView>

      {/* Search Bar */}
      {renderSearchBar()}
    </View>
  )
}

export default Search