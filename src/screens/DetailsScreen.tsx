import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../services/api";

type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  description?: string;
  category?: string;
  thumbnail?: string;
};

export default function DetailsScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setProduct(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Erro ao carregar detalhes:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.containerCenter}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.errorTitle}>Não foi possível carregar o produto.</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const discount = product.discountPercentage ?? 0;
  const finalPrice = product.price * (1 - discount / 100);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Detalhes do Produto</Text>

      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.name}>{product.title}</Text>
      <Text style={styles.text}>Preço original: ${product.price.toFixed(2)}</Text>
      <Text style={styles.text}>Desconto: {discount.toFixed(2)}%</Text>
      <Text style={styles.text}>Preço com desconto: ${finalPrice.toFixed(2)}</Text>
      <Text style={styles.text}>Categoria: {product.category}</Text>

      <Text style={styles.description}>{product.description}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#f2f2f2",
  },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    marginTop: 12,
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});