import React from 'react';
import { useAuth } from '../../services/auth/AuthProvider';

type Props = {
  //
};

const Profile: React.FC = (props: Props) => {
  const { user } = useAuth();
  return <>Welcome {user.name}</>;
};

export default Profile;
