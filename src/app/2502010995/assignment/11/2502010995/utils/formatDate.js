export const formatDate = (timestamp) => {
  if (!timestamp) return 'No date';
  return new Date(timestamp.seconds * 1000).toLocaleDateString('id-ID');
};