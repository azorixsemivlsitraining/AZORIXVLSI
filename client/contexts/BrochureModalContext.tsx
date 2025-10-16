import { createContext, useContext, ReactNode, FC } from 'react';
import { createContext, useContext, ReactNode, FC } from 'react';
import { useBrochureModal } from '../hooks/useBrochureModal';
import BrochureModal from '../components/BrochureModal';

interface BrochureModalContextType {
  openModal: () => void;
}

const BrochureModalContext = createContext<BrochureModalContextType | undefined>(undefined);

export const useBrochureModalContext = () => {
  const context = useContext(BrochureModalContext);
  if (!context) {
    throw new Error('useBrochureModalContext must be used within BrochureModalProvider');
  }
  return context;
};

export const BrochureModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, openModal, closeModal } = useBrochureModal();

  return (
    <BrochureModalContext.Provider value={{ openModal }}>
      {children}
      <BrochureModal isOpen={isOpen} onClose={closeModal} />
    </BrochureModalContext.Provider>
  );
};
