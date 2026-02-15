import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { BookForm } from '@/components/BookForm';
import { useBooks } from '@/hooks/useBooks';
import { BookInsert } from '@/lib/types';

export default function AddBookScreen() {
  const router = useRouter();
  const { addBook } = useBooks();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: BookInsert) => {
    setLoading(true);
    try {
      const result = await addBook(data);
      if (result) {
        router.back();
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar o livro. Tente novamente.');
      }
    } catch (err) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <BookForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      loading={loading}
    />
  );
}
