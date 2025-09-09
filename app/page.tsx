"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Eye, Shield, Heart, ChevronLeft, ChevronRight } from "lucide-react"

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 41,
    seconds: 18,
  })

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentRecipe, setCurrentRecipe] = useState(0)
  const [currentGift, setCurrentGift] = useState(0)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const playNotificationSound = () => {
    try {
      const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design-sem-nome-_1_-MqUCuw6SHvqMKrV6uJi83uNkbO32Zl.mp3")
      audio.volume = 0.6 // Aumentado o volume para ser mais chamativo
      audio.playbackRate = 1.1 // Ligeiramente mais rápido para criar urgência

      audio.addEventListener("loadeddata", () => {
        audio.volume = 0.1
        audio
          .play()
          .then(() => {
            // Fade-in mais rápido para coincidir com a notificação
            let currentVolume = 0.1
            const fadeIn = setInterval(() => {
              if (currentVolume < 0.6) {
                currentVolume += 0.2 // Fade-in mais rápido
                audio.volume = Math.min(currentVolume, 0.6)
              } else {
                clearInterval(fadeIn)
                setTimeout(() => {
                  audio.pause()
                  audio.currentTime = 0
                }, 3500)
              }
            }, 100)
          })
          .catch((error) => {
            console.log("[v0] Audio playback failed:", error)
          })
      })

      // Fallback para reprodução imediata se já estiver carregado
      if (audio.readyState >= 2) {
        audio.volume = 0.6
        audio
          .play()
          .then(() => {
            setTimeout(() => {
              audio.pause()
              audio.currentTime = 0
            }, 3500)
          })
          .catch((error) => {
            console.log("[v0] Audio playback failed:", error)
          })
      }
    } catch (error) {
      console.log("[v0] Audio not supported, notification shown silently")
    }
  }

  // Sales notifications
  useEffect(() => {
    const notifications = [
      'Aline (RS) acabou de comprar "Comidinhas do Bebê" por R$29,90 💛📱',
      "Priscila de SC garantiu o eBook agora mesmo! 💚",
      "Maria (SP) acabou de adquirir o eBook completo! 🎉",
      "Ana (RJ) garantiu as receitas para seu bebê! 👶",
    ]

    let notificationIndex = 0

    const showNotification = () => {
      playNotificationSound()

      // Create notification element
      const notification = document.createElement("div")
      notification.className =
        "fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50 max-w-sm animate-in slide-in-from-right"
      notification.innerHTML = `
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span class="text-sm text-gray-700">${notifications[notificationIndex]}</span>
        </div>
      `

      document.body.appendChild(notification)

      // Remove notification after 4 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove()
        }
      }, 4000)

      notificationIndex = (notificationIndex + 1) % notifications.length
    }

    const interval = setInterval(showNotification, 10000)

    // Show first notification after 2 seconds
    setTimeout(showNotification, 2000)

    return () => clearInterval(interval)
  }, [])

  // Recipe carousel
  useEffect(() => {
    const recipeTimer = setInterval(() => {
      setCurrentRecipe((prev) => (prev + 1) % recipes.length)
    }, 3000)
    return () => clearInterval(recipeTimer)
  }, [])

  useEffect(() => {
    const giftTimer = setInterval(() => {
      setCurrentGift((prev) => (prev + 1) % gifts.length)
    }, 4000)
    return () => clearInterval(giftTimer)
  }, [])

  const testimonials = [
    {
      image: "/print-fake-2.png",
      alt: "Conversa sobre filha de 8 meses que não comia nada",
    },
    {
      image: "/print-fake-5.png",
      alt: "Conversa sobre resultados após uma semana",
    },
    {
      image: "/print-fake-1.png",
      alt: "Múltiplas mensagens de agradecimento",
    },
    {
      image: "/print-fake-4.png",
      alt: "Bebê comendo abóbora e técnicas de BLW",
    },
    {
      image: "/print-fake-3.png",
      alt: "Agradecimento por melhorar alimentação da filha",
    },
    {
      image: "/print-fake-7.png",
      alt: "Conversa sobre indicação para amigas e lancheira na escola",
    },
    {
      image: "/print-fake-6.png",
      alt: "Bebê comendo ovos mexidos com franguinho",
    },
  ]

  const recipes = [
    {
      title: "Purê de Morango com Inhame",
      category: "Receita Doce • 6+ meses",
      ingredients: "• 4 morangos maduros\n• 2 inhames pequenos, cozidos\n• 1/2 xícara de água filtrada",
      preparation:
        "1. Cozinhe o inhame até amolecer\n2. No liquidificador, bata o inhame com os morangos\n3. Adicione água até obter consistência cremosa\n4. Sirva morno ou frio",
      color: "bg-gradient-to-br from-pink-100 to-pink-200",
      image: "/pure-de-morango-real.png",
    },
    {
      title: "Creme de Milho com Frango Desfiado",
      category: "Receita Salgada • 8+ meses",
      ingredients:
        "• 1/2 xícara de milho cozido\n• 1 pedaço pequeno de peito de frango\n• 1 batata pequena\n• Água ou caldo caseiro",
      preparation:
        "1. Cozinhe o frango até ficar macio e desfie\n2. Cozinhe a batata e amasse bem\n3. Bata o milho no liquidificador\n4. Misture tudo e ajuste a textura",
      color: "bg-gradient-to-br from-yellow-100 to-orange-200",
      image: "/creme-de-milho-real.png",
    },
    {
      title: "Papinha de Banana com Aveia",
      category: "Café da Manhã • 6+ meses",
      ingredients: "• 1 banana madura\n• 2 colheres de aveia em flocos\n• Leite materno ou fórmula\n• Pitada de canela",
      preparation:
        "1. Amasse a banana com garfo\n2. Misture a aveia\n3. Adicione leite até dar consistência\n4. Polvilhe canela se desejar",
      color: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      image: "/papinha-banana-real.png",
    },
    {
      title: "Sopa Cremosa de Abóbora com Lentilha",
      category: "Almoço Nutritivo • 9+ meses",
      ingredients: "• 200g de abóbora\n• 2 colheres de lentilha\n• 1 cenoura pequena\n• Água ou caldo caseiro",
      preparation:
        "1. Cozinhe a lentilha até ficar macia\n2. Cozinhe abóbora e cenoura\n3. Bata tudo no liquidificador\n4. Ajuste consistência com caldo",
      color: "bg-gradient-to-br from-orange-100 to-orange-200",
      image: "/sopa-abobora-real.png",
    },
    {
      title: "Risoto de Quinoa com Legumes",
      category: "Jantar Especial • 10+ meses",
      ingredients: "• 1/4 xícara de quinoa\n• Abobrinha pequena\n• Cenoura pequena\n• Caldo de legumes caseiro",
      preparation:
        "1. Cozinhe a quinoa em caldo de legumes\n2. Refogue os legumes picadinhos\n3. Misture tudo delicadamente\n4. Sirva morno com textura cremosa",
      color: "bg-gradient-to-br from-green-100 to-emerald-200",
      image: "/risoto-quinoa-real.png",
    },
    {
      title: "Smoothie de Manga com Iogurte Natural",
      category: "Lanche Refrescante • 12+ meses",
      ingredients: "• 1/2 manga madura\n• 2 colheres de iogurte natural\n• 1 colher de aveia\n• Água se necessário",
      preparation:
        "1. Descasque e corte a manga\n2. Bata no liquidificador com iogurte\n3. Adicione aveia para textura\n4. Sirva fresco em copinho",
      color: "bg-gradient-to-br from-orange-50 to-yellow-100",
      image: "/smoothie-manga-real.png",
    },
  ]

  const gifts = [
    {
      title: "Lista de Substituições Saudáveis",
      subtitle: "para Bebês de 6 a 12 meses",
      description:
        "Guia completo com alternativas nutritivas para quando faltam ingredientes ou seu bebê tem restrições alimentares.",
      image: "/baby-food-substitution-checklist-colorful.png",
      color: "bg-gradient-to-br from-green-100 to-emerald-200",
      icon: "📋",
    },
    {
      title: "Plano Alimentar Completo",
      subtitle: "dos 6 aos 12 Meses",
      description:
        "Cronograma detalhado com sugestões de cardápios semanais organizados por faixa etária e desenvolvimento.",
      image: "/colorful-baby-meal-plan.png",
      color: "bg-gradient-to-br from-blue-100 to-sky-200",
      icon: "👶",
    },
    {
      title: "Dicas de Armazenamento",
      subtitle: "de Alimentos para Bebês",
      description:
        "Técnicas seguras para conservar, congelar e reaproveitar as comidinhas do seu bebê sem perder nutrientes.",
      image: "/baby-food-storage-containers.png",
      color: "bg-gradient-to-br from-purple-100 to-violet-200",
      icon: "🥫",
    },
    {
      title: "Guia de Texturas por Idade",
      subtitle: "Evolução Alimentar",
      description:
        "Passo a passo de como evoluir as texturas conforme seu bebê cresce, com dicas práticas e sinais de prontidão.",
      image: "/baby-food-texture-progression.png",
      color: "bg-gradient-to-br from-pink-100 to-rose-200",
      icon: "🥄",
    },
  ]

  const handleCheckout = () => {
    window.open("https://pay.cakto.com.br/jee6ang_515721", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 relative">
      {/* Background baby image */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/cute-baby-eating.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "300px",
        }}
      />

      {/* Main Hero Section */}
      <div className="py-16 bg-gradient-to-b from-pink-100 to-orange-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4 flex items-center justify-center gap-3">
              🍼 Do leite à Colher 🥄
            </h1>
            <p className="text-xl text-teal-600 font-semibold mb-8">
              +100 receitas nutritivas e emocionantes para transformar a alimentação do seu bebê
            </p>
          </div>

          {/* Video Section */}
          <div className="mb-12">
            <div
              className="bg-black rounded-lg max-w-md mx-auto overflow-hidden shadow-2xl"
              style={{ aspectRatio: "9/16" }}
            >
              <video
                controls
                className="w-full h-full object-cover"
                poster="/video-thumbnail-inicio.png"
                preload="metadata"
                style={{ width: "100%", height: "100%" }}
              >
                <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Video%202025-08-26%20at%2021.40.28-DrFuTKmsKgbEYdSnNgQ8cSinKrnNt5.mp4" type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>

          <div className="bg-orange-100 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">🍌</span>
              <h3 className="text-xl font-bold text-orange-800">Tá no preço de banana, mas não é de graça...</h3>
            </div>
            <p className="text-gray-700 mb-4">Porque o que é de graça, ninguém valoriza!</p>
            <p className="text-gray-700 mb-6">
              Esse livrinho foi feito com amor e tá só <span className="font-bold text-teal-600">R$29,90</span> — é
              quase um presente! 💛
            </p>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-gray-700 italic">
                📚 São +100 receitas por fase e textura, pra facilitar sua rotina e cuidar da alimentação do bebê. 😊 ✨
              </p>
            </div>

            <div className="bg-blue-100 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl">💡</span>
                <span className="font-semibold text-blue-800">Quer pagar ainda menos?</span>
              </div>
              <p className="text-blue-700">
                Usa o cupom <span className="font-bold">COLHER10</span> e ganha desconto!
              </p>
            </div>

            <div className="bg-pink-100 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-xl">⏰</span>
                <span className="font-semibold text-red-600">Corre antes que o valor suba!</span>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-bold rounded-lg mb-4"
            >
              QUERO TRANSFORMAR A ALIMENTAÇÃO DO MEU BEBÊ 🥄
            </Button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-16 bg-orange-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">
            "Meu bebê não quer comer... o que eu faço?"
          </h2>

          <div className="space-y-4 mb-8">
            <p className="text-gray-700">Se você sente um aperto no peito cada vez que ele empurra o pratinho...</p>
            <p className="text-gray-700">Se já chorou escondida depois de mais uma tentativa frustrada...</p>
            <p className="text-gray-700">Se sente culpa por achar que está falhando...</p>
            <p className="text-gray-800 font-semibold">Você não está sozinha.</p>
          </div>

          <div className="bg-pink-100 border-l-4 border-pink-400 p-6 mb-8">
            <p className="text-gray-700 italic">
              Esse eBook foi feito <span className="font-bold">por uma mãe, para mães</span> que só querem ver seus
              filhos crescer bem alimentados.
            </p>
          </div>
        </div>
      </div>

      {/* What is Section */}
      <div className="py-16 bg-gradient-to-b from-orange-50 to-pink-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl">🍽️</span>
            <h2 className="text-3xl font-bold text-teal-600">O que é o Do leite à Colher?</h2>
          </div>

          <p className="text-center text-gray-700 mb-12 text-lg">
            Mais de 100 receitas nutritivas, divididas por fase e horário, pensadas para o paladar e o desenvolvimento
            do seu bebê. Testadas, aprovadas e feitas com muito amor.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-yellow-100 border-yellow-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="font-bold text-lg mb-2">Por Idade</h3>
              <p className="text-gray-700">Receitas adaptadas para cada fase do desenvolvimento</p>
            </Card>

            <Card className="bg-green-100 border-green-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🥄</div>
              <h3 className="font-bold text-lg mb-2">Por Textura</h3>
              <p className="text-gray-700">Do mais lisinho ao mais texturizado, respeitando o desenvolvimento</p>
            </Card>

            <Card className="bg-purple-100 border-purple-200 p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="font-bold text-lg mb-2">Por Refeição</h3>
              <p className="text-gray-700">Café da manhã, almoço, lanche e jantar completos</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Recipe Preview Section */}
      <div className="py-16 bg-pink-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Eye className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-teal-600">Veja por dentro do eBook!</h2>
          </div>

          <p className="text-center text-gray-700 mb-12 text-lg">
            Algumas das receitas nutritivas e deliciosas que você vai encontrar
          </p>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentRecipe * 100}%)` }}
              >
                {recipes.map((recipe, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className={`${recipe.color} p-8 shadow-xl border-2 border-white/50`}>
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
                        <span className="inline-block bg-white/70 px-4 py-2 rounded-full text-sm font-semibold text-gray-700">
                          {recipe.category}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-bold mb-3 text-lg text-gray-800 flex items-center gap-2">
                              <span className="text-xl">🥄</span>
                              Ingredientes:
                            </h4>
                            <div className="text-gray-700 whitespace-pre-line bg-white/70 p-4 rounded-lg shadow-sm border border-white/50">
                              {recipe.ingredients}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold mb-3 text-lg text-gray-800 flex items-center gap-2">
                              <span className="text-xl">👩‍🍳</span>
                              Modo de preparo:
                            </h4>
                            <div className="text-gray-700 whitespace-pre-line bg-white/70 p-4 rounded-lg shadow-sm border border-white/50">
                              {recipe.preparation}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="relative group">
                            <div className="bg-white p-4 rounded-2xl shadow-xl">
                              <img
                                src={recipe.image || "/placeholder.svg"}
                                alt={recipe.title}
                                className="w-72 h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-3 rounded-full shadow-lg">
                              <span className="text-xl">😋</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentRecipe((prev) => (prev - 1 + recipes.length) % recipes.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={() => setCurrentRecipe((prev) => (prev + 1) % recipes.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex justify-center mt-8 gap-3">
              {recipes.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentRecipe ? "bg-red-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentRecipe(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* For Whom Section */}
      <div className="py-16 bg-orange-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-12">Pra quem é esse eBook?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  Mães de primeira viagem que querem acertar na alimentação do bebê
                </p>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  Mamães que querem variedade no cardápio do seu pequeno
                </p>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  Quem quer receitas práticas e nutritivas para o dia a dia
                </p>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  Famílias que buscam uma alimentação mais saudável e natural
                </p>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 group-hover:text-teal-700 transition-colors">
                  Mães que querem economizar tempo sem abrir mão da qualidade
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-orange-100 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">👶</div>
                <h3 className="text-2xl font-bold text-teal-600 mb-4">
                  Transforme a alimentação do seu bebê hoje mesmo!
                </h3>
                <p className="text-gray-700 mb-6">Mais de 100 receitas testadas e aprovadas por milhares de mamães</p>
                <Button
                  onClick={handleCheckout}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  QUERO COMEÇAR AGORA! 🍼
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gifts Carousel Section */}
      <div className="py-16 bg-gradient-to-b from-green-50 to-teal-50 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">🎁</span>
              <h2 className="text-3xl font-bold text-teal-600">Presentinhos que você leva junto!</h2>
            </div>
            <p className="text-gray-700 text-lg">
              Além do eBook completo com mais de 100 receitas, você ainda recebe esses bônus incríveis para facilitar
              ainda mais sua rotina:
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentGift * 100}%)` }}
              >
                {gifts.map((gift, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card
                      className={`${gift.color} p-8 shadow-xl border-2 border-white/50 hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{gift.icon}</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{gift.title}</h3>
                        <p className="text-lg font-semibold text-gray-600 mb-4">{gift.subtitle}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                          <p className="text-gray-700 text-lg mb-6 leading-relaxed">{gift.description}</p>

                          <div className="bg-white/80 p-4 rounded-lg">
                            <h4 className="font-bold text-gray-800 mb-2">✨ O que você vai encontrar:</h4>
                            <ul className="text-gray-700 text-sm space-y-1">
                              {gift.title.includes("Substituições") && (
                                <>
                                  <li>• Alternativas para alergias alimentares</li>
                                  <li>• Substituições por faixa etária</li>
                                  <li>• Ingredientes de fácil acesso</li>
                                </>
                              )}
                              {gift.title.includes("Plano Alimentar") && (
                                <>
                                  <li>• Cardápios semanais completos</li>
                                  <li>• Horários ideais para cada refeição</li>
                                  <li>• Progressão alimentar detalhada</li>
                                </>
                              )}
                              {gift.title.includes("Armazenamento") && (
                                <>
                                  <li>• Técnicas de congelamento seguro</li>
                                  <li>• Potes e recipientes ideais</li>
                                  <li>• Tempo de conservação</li>
                                </>
                              )}
                              {gift.title.includes("Texturas") && (
                                <>
                                  <li>• Evolução por idade</li>
                                  <li>• Sinais de prontidão</li>
                                  <li>• Técnicas de preparo</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="relative group">
                            <div className="bg-white p-4 rounded-2xl shadow-xl">
                              <img
                                src={gift.image || "/placeholder.svg"}
                                alt={gift.title}
                                className="w-72 h-72 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-teal-600 text-white p-3 rounded-full shadow-lg">
                              <span className="text-xl">{gift.icon}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentGift((prev) => (prev - 1 + gifts.length) % gifts.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <button
              onClick={() => setCurrentGift((prev) => (prev + 1) % gifts.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex justify-center mt-8 gap-3">
              {gifts.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentGift ? "bg-teal-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentGift(index)}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-green-200">
              <h3 className="text-2xl font-bold text-teal-600 mb-4">🎯 Valor total dos presentinhos: R$127,00</h3>
              <p className="text-gray-700 mb-6">
                Mas você leva TUDO por apenas <span className="text-3xl font-bold text-teal-600">R$29,90</span>
              </p>
              <Button
                onClick={handleCheckout}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-bold rounded-lg"
              >
                QUERO TODOS OS PRESENTINHOS! 🎁
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-pink-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-2xl">💬</span>
            <h2 className="text-3xl font-bold text-teal-600">O que as mamães estão falando?</h2>
          </div>

          <p className="text-center text-gray-700 mb-12">
            Mais de 10.000 mamães já estão usando o eBook e tendo resultados incríveis! Veja o que algumas delas
            disseram:
          </p>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex animate-scroll-testimonials"
                style={{
                  width: `${testimonials.length * 2 * 100}%`,
                  animation: `scroll-testimonials ${testimonials.length * 4}s linear infinite`,
                }}
              >
                {/* Original testimonials */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`original-${index}`}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / (testimonials.length * 2)}%` }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.alt}
                          className="max-w-full h-auto rounded-lg shadow-lg"
                          style={{ maxHeight: "400px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicated testimonials for seamless loop */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / (testimonials.length * 2)}%` }}
                  >
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.alt}
                          className="max-w-full h-auto rounded-lg shadow-lg"
                          style={{ maxHeight: "400px" }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-pink-100 py-8 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🏷️</span>
              </div>
              <h2 className="text-2xl font-bold text-teal-600">Oferta imperdível:</h2>
            </div>

            <Card className="bg-pink-100 border-pink-200 p-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-teal-600" />
                <span className="text-teal-600 font-semibold">Oferta por tempo limitado!</span>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, "0")}</div>
                  <div className="text-xs">horas</div>
                </div>
                <div className="text-2xl font-bold text-red-600 flex items-center">:</div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, "0")}</div>
                  <div className="text-xs">minutos</div>
                </div>
                <div className="text-2xl font-bold text-red-600 flex items-center">:</div>
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg text-center">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, "0")}</div>
                  <div className="text-xs">segundos</div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-gray-500 line-through text-lg mb-2">De R$129,90</div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full inline-block text-sm font-bold mb-4">
                  77% OFF
                </div>
                <div className="text-4xl font-bold text-teal-600 mb-4">
                  <span className="text-lg">por apenas</span> R$29,90
                </div>
                <p className="text-gray-600 mb-6">
                  Você economiza <span className="text-green-600 font-bold">R$100,00</span> e garante acesso imediato ao
                  conteúdo que pode transformar a alimentação do seu bebê!
                </p>

                <Button
                  onClick={handleCheckout}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-bold rounded-lg mb-4"
                >
                  🥄 QUERO AS RECEITINHAS AGORA! 🍎 →
                </Button>

                <p className="text-gray-500 text-sm mt-4">Pagamento único e 100% seguro • Acesso imediato</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Guarantee Section */}
      <div className="py-16 bg-green-50 relative z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-teal-600" />
            <h2 className="text-3xl font-bold text-teal-600">Garantia incondicional de 7 dias</h2>
          </div>

          <Card className="bg-white p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>

            <p className="text-gray-700 mb-6">Se você não amar, devolvemos 100% do seu dinheiro. Simples assim.</p>

            <p className="text-gray-700 mb-6">
              Experimente o eBook por até 7 dias. Se não ficar satisfeita, basta enviar um email e devolvemos
              integralmente o valor pago, sem perguntas.
            </p>

            <p className="text-green-600 font-bold text-lg">Risco zero para você. Toda a confiança no nosso produto.</p>
          </Card>

          <div className="text-center mt-8">
            <Button
              onClick={handleCheckout}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-bold rounded-lg"
            >
              COMECE A TRANSFORMAR A ALIMENTAÇÃO DO SEU BEBÊ 🍼 →
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-pink-100 py-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-teal-600" />
            <span className="text-teal-600 font-semibold">Feito com amor para mamães e bebês</span>
          </div>

          <p className="text-gray-600 mb-4">© 2025 Do leite à Colher – Todos os direitos reservados.</p>

          <p className="text-gray-500 text-sm mb-6">Este produto é informativo e não substitui orientação médica.</p>

          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700">
              Termos de Uso
            </a>
            <span>•</span>
            <a href="#" className="hover:text-gray-700">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
