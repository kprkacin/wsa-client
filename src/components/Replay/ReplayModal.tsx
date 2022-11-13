import React, { useState } from 'react';
import { Modal, Button, Group, ModalProps } from '@mantine/core';
import TicTacToeReplay from './TicTacToeReplay';

type ReplayModaLProps = ModalProps & {
  replayId: string;
};
const ReplayModal: React.FC<ReplayModaLProps> = (props) => {
  const { replayId, ...otherModalProps } = props;

  return (
    <>
      <Modal {...otherModalProps} size={'90%'}>
        {replayId && <TicTacToeReplay replayId={replayId} />}
      </Modal>
    </>
  );
};
export default ReplayModal;
