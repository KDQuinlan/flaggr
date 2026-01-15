import { useMemo } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Image } from 'expo-image';

import { useTheme } from '@/context/ThemeContext';
import { getHomeStyles } from '@/styles/home';

type SocialMedia = {
  name: string;
  icon: string;
  url: string;
};

const socialMedia: SocialMedia[] = [
  {
    name: 'Discord',
    icon: require('@/assets/images/icons/resources/media/discord.png'),
    url: 'https://discord.gg/vbcU2rhaFJ',
  },
  {
    name: 'Instagram',
    icon: require('@/assets/images/icons/resources/media/instagram.png'),
    url: 'https://www.instagram.com/flaggrapp/',
  },
  {
    name: 'X',
    icon: require('@/assets/images/icons/resources/media/x.png'),
    url: 'https://x.com/flaggrapp',
  },
  {
    name: 'TikTok',
    icon: require('@/assets/images/icons/resources/media/tiktok.png'),
    url: 'https://www.tiktok.com/@flaggrapp',
  },
];

const SocialMediaLinks = () => {
  const { t } = useTranslation('home');
  const { theme } = useTheme();
  const styles = useMemo(() => getHomeStyles(theme), [theme]);

  return (
    <View
      style={styles.socialMediaContainer}
      accessibilityRole="text"
      accessibilityLabel={t('socialMediaPreface')}
    >
      {socialMedia.map((media, index) => (
        <Pressable
          key={index}
          onPress={() => Linking.openURL(media.url)}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          accessibilityRole="button"
          accessibilityLabel={t('socialMedia', { media: media.name })}
        >
          <Image source={media.icon} style={styles.socialMediaIcon} />
        </Pressable>
      ))}
    </View>
  );
};

export default SocialMediaLinks;
