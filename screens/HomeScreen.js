import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [pickedForYou, setPickedForYou] = useState([]);
  const [jumpBackIn, setJumpBackIn] = useState([]);
  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from MockAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://6772e0fc77a26d4701c40e36.mockapi.io/images'); // MockAPI URL
        const data = await response.json();

        // Group data into sections
        setPickedForYou(data.slice(0, 5)); // First 5 items
        setRecentlyPlayed(data.slice(5, 10)); // Next 5 items
        setJumpBackIn(data.slice(10, 15)); // Next 5 items
        setFavoriteArtists(data.slice(15, 20)); // Last 5 items
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderPlaylistItem = ({ item }) => (
    <TouchableOpacity style={styles.playlistCard}>
      <Image source={{ uri: item.image }} style={styles.playlistImage} />
      <Text style={styles.playlistTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.playlistDescription} numberOfLines={2}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  const renderArtistItem = ({ item }) => (
    <TouchableOpacity style={styles.artistCard}>
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.artistLabel}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good afternoon</Text>
        <View style={styles.headerIcons}>
          <Icon name="notifications-outline" size={20} color="#FFF" style={styles.icon} />
          <Icon name="time-outline" size={20} color="#FFF" style={styles.icon} />
          <Icon name="settings-outline" size={20} color="#FFF" style={styles.icon} />
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Podcasts & Shows</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Audiobooks</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView>
        {/* Picked for You Section */}
        <Text style={styles.sectionTitle}>Picked for you</Text>
        <FlatList
          data={pickedForYou}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Recently Played Section */}
        <Text style={styles.sectionTitle}>Recently Played</Text>
        <FlatList
          data={recentlyPlayed}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Jump Back In Section */}
        <Text style={styles.sectionTitle}>Jump back in</Text>
        <FlatList
          data={jumpBackIn}
          renderItem={renderPlaylistItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Favorite Artists Section */}
        <Text style={styles.sectionTitle}>Your favorite artists</Text>
        <FlatList
          data={favoriteArtists}
          renderItem={renderArtistItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.favoriteArtistsList}
        />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity>
          <Icon name="home" size={28} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="library-outline" size={28} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="person-circle-outline" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  greeting: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  categories: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#282828',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  categoryText: {
    color: '#FFF',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  horizontalList: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  playlistCard: {
    marginRight: 15,
    alignItems: 'center',
    width: 120,
  },
  playlistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  playlistTitle: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  playlistDescription: {
    color: '#AAA',
    fontSize: 10,
    textAlign: 'center',
  },
  favoriteArtistsList: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  artistCard: {
    marginRight: 20,
    alignItems: 'center',
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  artistName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  artistLabel: {
    color: '#AAA',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#282828',
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default HomeScreen;
