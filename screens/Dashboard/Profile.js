import {
  View, Text, Image,
  ScrollView, TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'

import { connect } from 'react-redux'
import { toggleTheme } from '../../stores/themeActions'

import {
  TextButton, IconButton,
  LineDivider, ProgressBar,
  ProfileValue, ProfileRadioButton,
} from '../../components'
import { COLORS, SIZES, FONTS, icons, images, dummyData, theme } from '../../constants'

const Profile = ({ appTheme, toggleTheme }) => {

  const [newCourseNotification, setNewCourseNotification] = React.useState(false);
  const [studyReminder, setStudyReminder] = React.useState(false);

  // Handler
  function toggleThemeHandler() {
    if (appTheme?.name == 'light') {
      toggleTheme('dark')
    } else toggleTheme('light')
  }

  // Render

  function renderHeader() {
    return (
      <View style={{
        marginTop: 15,
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
      }}>
        <Text style={{
          color: appTheme?.textColor,
          fontWeight: 'bold',
          ...FONTS.h2,
        }}>
          Profile
        </Text>

        <IconButton icon={icons.sun}
          iconStyle={{
            tintColor: appTheme?.tintColor,
          }}
          onPress={() => toggleThemeHandler()}
        />
      </View>
    )
  }

  function renderProfileCard() {
    return (
      <View style={{
        flexDirection: 'row',
        paddingVertical: 20,
        borderRadius: SIZES.radius,
        backgroundColor: appTheme?.backgroundColor2,
        paddingHorizontal: SIZES.radius,
      }}>
        {/* Profile Image */}
        <TouchableOpacity
          style={{
            width: 70, height: 70,
          }}
        >
          <Image source={images.profile} style={{
            width: '100%', height: '100%',
            borderRadius: 35,
            borderWidth: 1,
            borderColor: COLORS.white,
          }} />

          <View style={{
            position: 'absolute',
            width: '100%', height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <View style={{
              width: 25, height: 25,
              marginBottom: -15,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              backgroundColor: COLORS.primary,
            }}>
              <Image source={icons.camera}
                style={{
                  width: 15, height: 15,
                }}
                resizeMode='contain'
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Details */}
        <View style={{
          flex: 1,
          marginLeft: SIZES.radius,
          alignItems: 'flex-start',
        }}>
          <Text style={{
            color: COLORS.white,
            fontWeight: 'bold',
            ...FONTS.h3,
          }}>Wendy</Text>

          <Text style={{
            color: COLORS.white,
            ...FONTS.body4,
          }}>Frontend Developer</Text>

          {/* Progress */}
          <ProgressBar
            progress='58%'
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          />

          <View style={{
            flexDirection: 'row',
          }}>
            <Text style={{
              flex: 1,
              color: COLORS.white,
              ...FONTS.body4,
            }}>Overall Progress</Text>

            <Text style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}>58%</Text>
          </View>

          {/* Member */}
          <TextButton
            label="+ Become Member"
            containerStyle={{
              height: 35,
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: 20,
              backgroundColor: appTheme?.backgroundColor4,
            }}
            labelStyle={{
              color: appTheme?.textColor2,
            }}
          />
        </View>
      </View>
    )
  }

  function renderProfileSection1() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue
          label="Name"
          value="Wendy"
          icon={icons.profile}
        />

        <LineDivider />

        <ProfileValue
          label="Email"
          value="lienle2210@gmail.com"
          icon={icons.email}
        />

        <LineDivider />

        <ProfileValue
          label="Password"
          value="Updated 2 weeks ago"
          icon={icons.password}
        />

        <LineDivider />

        <ProfileValue
          label="Contact Number"
          value="+8411111111"
          icon={icons.call}
        />

      </View>
    )
  }

  function renderProfileSection2() {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue
          value="Pages"
          icon={icons.star_1}
        />

        <LineDivider />

        <ProfileRadioButton
          icon={icons.new}
          label="New Course Notifications"
          isSelected={newCourseNotification}
          onPress={() => setNewCourseNotification(!newCourseNotification)}
        />

        <LineDivider />

        <ProfileRadioButton
          icon={icons.reminder}
          label="Study Reminder"
          isSelected={studyReminder}
          onPress={() => setStudyReminder(!studyReminder)}
        />
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: appTheme?.backgroundColor1,
    }}>
      {/* Header */}
      {renderHeader()}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 150,
          marginTop: 15,
          paddingHorizontal: SIZES.padding,

        }}
      >
        {/* Profile Card */}
        {renderProfileCard()}

        {/* Profile Section 1 */}
        {renderProfileSection1()}

        {/* Profile Section 2 */}
        {renderProfileSection2()}
      </ScrollView>
      {/*  */}
    </View>
  )
}

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    borderRadius: SIZES.radius,
  }
})

function mapStateProps(state) {
  return {
    appTheme: state.appTheme,
    error: state.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleTheme: (themeType) => {
      return dispatch(toggleTheme(themeType))
    }
  }
}

export default connect(mapStateProps, mapDispatchToProps)(Profile)