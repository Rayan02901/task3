// utils/ReviewDatas.js
const profileCache = new Map();
const reviewsCache = new Map();
const userIdToProfileIdMap = new Map();

export const saveProfileIds = (profileData) => {
  profileData.forEach(({ profileId, userId, bookId }) => {
    if (userId) {
      profileCache.set(profileId, { userId, bookId, data: null });
      userIdToProfileIdMap.set(userId, profileId);
    } else {
      console.warn(`Missing userId for profileId: ${profileId}`);
    }
  });
};

export const fetchProfileById = async (identifier, token, isUserId = false) => {
  let profileId = identifier;
  
  if (isUserId) {
    profileId = userIdToProfileIdMap.get(identifier);
    if (!profileId) {
      try {
        const response = await fetch(`https://localhost:5000/api/UserProfile/user/${identifier}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'text/plain'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile data for userId: ${identifier}`);
        }

        const data = await response.json();
        profileId = data.profileId;
        userIdToProfileIdMap.set(identifier, profileId);
        profileCache.set(profileId, { userId: identifier, data });
        return data;
      } catch (error) {
        console.error(`Error fetching profile data for userId: ${identifier}`, error);
        throw error;
      }
    }
  }

  if (profileCache.has(profileId) && profileCache.get(profileId).data !== null) {
    return profileCache.get(profileId).data;
  }

  try {
    const response = await fetch(`https://localhost:5000/api/UserProfile/${profileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'text/plain'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile data for profileId: ${profileId}`);
    }

    const data = await response.json();
    const userId = profileCache.has(profileId) ? profileCache.get(profileId).userId : null;

    if (userId !== null) {
      profileCache.set(profileId, { userId, data });
      userIdToProfileIdMap.set(userId, profileId);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching profile data for profileId: ${profileId}`, error);
    throw error;
  }
};

export const saveReviewsByProfileId = (profileData, reviews) => {
  profileData.forEach(({ profileId, userId }) => {
    if (userId) {
      if (!reviewsCache.has(profileId)) {
        reviewsCache.set(profileId, { userId, reviews: [] });
      }
      const userReviews = reviews.filter(review => review.profileId === profileId);
      reviewsCache.get(profileId).reviews = userReviews;
    }
  });
};

export const getCachedProfileById = (profileId) => {
  return profileCache.has(profileId) ? profileCache.get(profileId).data : null;
};

export const getCachedUserIdByProfileId = (profileId) => {
  return profileCache.has(profileId) ? profileCache.get(profileId).userId : null;
};

export const clearProfileCache = () => {
  profileCache.clear();
  reviewsCache.clear();
  userIdToProfileIdMap.clear();
};

export const getRecipientId = (profileId) => {
  return profileCache.has(profileId) ? profileCache.get(profileId).userId : null;
};