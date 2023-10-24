import {
  View, Text, Image, ImageBackground,
  ScrollView,
} from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { COLORS, SIZES, FONTS, icons, images, dummyData } from '../../constants'
import {
  IconButton, TextButton, VerticalCourseCard,
  LineDivider, CategoryCard, HorizontalCourseCard,
} from '../../components'

const Section = ({ containerStyle, title, onPress, children }) => {
  return (
    <View style={{ ...containerStyle }}>
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
      }}>
        <Text style={{
          flex: 1,
          color: COLORS.black,
          fontWeight: 'bold',
          ...FONTS.h2,
        }}>{title}</Text>

        <TextButton
          containerStyle={{
            width: 80,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
          }}
          label="See All"
          onPress={onPress}
        />
      </View>

      {children}
    </View>
  )
}

const Home = () => {

  const navigation = useNavigation();

  function renderHeader() {
    return (
      <View style={{
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
      }}>
        {/* Greetings */}
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            color: COLORS.black,
            fontWeight: 'bold',
            ...FONTS.h2,
          }}>Hello, Wendy!</Text>
          <Text style={{
            color: COLORS.gray50,
            ...FONTS.body4,
          }}>Sunday, 20th Au 2023</Text>
        </View>

        {/* Notification */}
        <IconButton
          icon={icons.notification}
          iconStyle={{
            tintColor: COLORS.black,
          }}
        />
      </View>
    )
  }

  function renderStartLearning() {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'flex-start',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{
          borderRadius: SIZES.radius,
        }}
      >
        {/* Info*/}
        <View >
          <Text style={{
            color: COLORS.white,
            ...FONTS.body3,
          }}>HOW TO</Text>
          <Text style={{
            color: COLORS.white,
            fontWeight: '800',
            ...FONTS.h3,
          }}>Make your brand more visible with our checklist</Text>
          <Text style={{
            marginTop: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
          }}>By Lien Le</Text>
        </View>

        {/* Image */}
        <Image source={images.start_learning}
          style={{
            width: '100%',
            height: 120,
            marginTop: SIZES.padding,
          }}
        />

        {/* Button */}
        <TextButton
          label="Start Learning"
          containerStyle={{
            height: 35,
            paddingHorizontal: SIZES.radius,
            borderRadius: 15,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{
            color: COLORS.black,
          }}
        />
      </ImageBackground>
    )
  }

  function renderCourses() {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        showsHorizontalScrollIndicator={false}
        listKey="Courses"
        keyExtractor={item => `Courses-${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.padding,
        }}
        renderItem={({ item, index }) => (
          <VerticalCourseCard
            containerStyle={{
              marginLeft: index == 0 ? SIZES.padding : 0,
              marginRight: index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
            }}
            course={item}
          />
        )}
      />
    )
  }

  function renderCategories() {
    return (
      <Section
        title="Categories"
      >
        <FlatList
          horizontal
          data={dummyData.categories}
          showsHorizontalScrollIndicator={false}
          listKey="Categories"
          keyExtractor={item => `Categories-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard category={item}
              sharedElementPrefix="Home"
              containerStyle={{
                marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0,
                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
              }}
              onPress={() => navigation.navigate("CourseListing",{
                category: item,
                sharedElementPrefix: "Home"
              })}
            />
          )}
        />
      </Section>
    )
  }

  function renderPolularCourses() {
    return (
      <Section
        containerStyle={{
          marginTop: SIZES.padding,
        }}
        title="Polular Courses"
      >
        <FlatList
          data={dummyData.courses_list_2}
          listKey="PolularCourses"
          keyExtractor={item => `PolularCourses-${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
          scrollEnabled={false}
          renderItem={({ item, index }) => (
            <HorizontalCourseCard
              course={item}
              containerStyle={{
                marginVertical: SIZES.padding,
                marginTop: index == 0 ? SIZES.base : SIZES.padding,
              }}
            />
          )}
          ItemSeparatorComponent={() => (
            <LineDivider
              lineStyle={{
                backgroundColor: COLORS.gray20
              }}
            />
          )}
        />
      </Section>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      {/* Header */}
      {renderHeader()}

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 180,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Start Learning */}
        {renderStartLearning()}

        {/* Courses */}
        {renderCourses()}

        <LineDivider
          lineStyle={{
            marginVertical: SIZES.radius,
          }}
        />

        {/* Categories */}
        {renderCategories()}

        {/* Polular Courses */}
        {renderPolularCourses()}
      </ScrollView>
    </View>
  )
}

export default Home