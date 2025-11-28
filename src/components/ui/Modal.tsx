import React from 'react';
import { 
  Modal as GluestackModal, 
  ModalBackdrop, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody,
  Heading,
  Icon,
  CloseIcon,
} from '@gluestack-ui/themed';

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ 
  visible, 
  onDismiss, 
  title,
  children 
}) => {
  return (
    <GluestackModal
      isOpen={visible}
      onClose={onDismiss}
    >
      <ModalBackdrop />
      <ModalContent>
        {title && (
          <ModalHeader>
            <Heading style={{ fontSize: 20 }}>{title}</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
        )}
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </GluestackModal>
  );
};
