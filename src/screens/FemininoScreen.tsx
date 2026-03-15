import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { api } from "../services/api";

const CATEGORIES = [
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
];

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function FemininoScreen() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.get(`/products/category/${category}`);
        setProducts(res.data.products || []);
      } catch (e) {
        setError("Falha ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [category]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Text style={styles.logout}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Categorias (Feminino)</Text>

      <View style={styles.row}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={styles.chipText}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" />}

      {!loading && error && <Text style={styles.error}>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/details",
                  params: { id: String(item.id) },
                })
              }
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text>Preço: ${item.price}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  logout: { color: "red", marginBottom: 10, fontSize: 16, fontWeight: "600" },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  chip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  chipActive: { opacity: 0.8 },
  chipText: { fontSize: 12 },
  error: { marginVertical: 10 },
  card: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: { fontWeight: "bold", marginBottom: 4 },
});