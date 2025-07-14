import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import CategoryPage from './CategoryPage';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<{id: string, name: string, icon: string} | null>(null);

  const categories = [
    { id: 'attractions', name: 'Достопримечательности', icon: 'MapPin', count: 45 },
    { id: 'recreation', name: 'Базы отдыха и санатории', icon: 'TreePine', count: 32 },
    { id: 'baths', name: 'Бани и сауны', icon: 'Waves', count: 28 },
    { id: 'restaurants', name: 'Кафе и рестораны', icon: 'Utensils', count: 156 },
    { id: 'repair', name: 'Ремонт оргтехники и бытовой техники', icon: 'Wrench', count: 89 },
    { id: 'auto', name: 'Автосервисы', icon: 'Car', count: 134 },
    { id: 'realestate', name: 'ЖКХ и недвижимость', icon: 'Home', count: 67 },
    { id: 'beauty', name: 'Красота и здоровье', icon: 'Sparkles', count: 78 },
    { id: 'medical', name: 'Медицина', icon: 'Stethoscope', count: 124 },
    { id: 'education', name: 'Образование', icon: 'GraduationCap', count: 93 },
    { id: 'security', name: 'Охрана и безопасность', icon: 'Shield', count: 41 },
    { id: 'legal', name: 'Юридические и финансовые услуги', icon: 'Scale', count: 56 },
    { id: 'government', name: 'Услуги для населения - МФЦ, ГБУ, соц.защита', icon: 'Building', count: 34 }
  ];

  const topCompanies = [
    {
      id: 1,
      name: 'МедЦентр «Здоровье»',
      category: 'Медицина',
      rating: 4.8,
      reviews: 247,
      address: 'ул. Большая Покровская, 15',
      phone: '+7 (831) 123-45-67',
      verified: true,
      premium: true
    },
    {
      id: 2,
      name: 'Автосервис «Профи»',
      category: 'Автосервисы',
      rating: 4.7,
      reviews: 189,
      address: 'ул. Московское шоссе, 234',
      phone: '+7 (831) 234-56-78',
      verified: true,
      premium: false
    },
    {
      id: 3,
      name: 'Ресторан «Волга»',
      category: 'Кафе и рестораны',
      rating: 4.9,
      reviews: 312,
      address: 'Набережная Федоровского, 8',
      phone: '+7 (831) 345-67-89',
      verified: true,
      premium: true
    },
    {
      id: 4,
      name: 'Учебный центр «Знание»',
      category: 'Образование',
      rating: 4.6,
      reviews: 156,
      address: 'пр. Гагарина, 45',
      phone: '+7 (831) 456-78-90',
      verified: true,
      premium: false
    }
  ];

  const stats = [
    { label: 'Компаний в каталоге', value: '2,847', icon: 'Building2' },
    { label: 'Отзывов пользователей', value: '18,432', icon: 'MessageCircle' },
    { label: 'Категорий услуг', value: '13', icon: 'Grid3X3' },
    { label: 'Проверенных компаний', value: '1,234', icon: 'CheckCircle' }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? 'Star' : 'StarHalf'} 
        size={16} 
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
      />
    ));
  };

  const handleCategoryClick = (category: {id: string, name: string, icon: string}) => {
    setSelectedCategory(category);
  };

  const handleBackToMain = () => {
    setSelectedCategory(null);
  };

  // Показываем страницу категории, если категория выбрана
  if (selectedCategory) {
    return (
      <CategoryPage 
        categoryId={selectedCategory.id}
        categoryName={selectedCategory.name}
        categoryIcon={selectedCategory.icon}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={32} className="text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Нижегородский</h1>
                  <p className="text-sm text-gray-600">Справочный портал</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить компанию
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Рейтинг надежных компаний
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Найдите лучшие услуги в Нижнем Новгороде с проверенными отзывами
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск компаний, услуг, категорий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 shadow-lg"
              />
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary-700">
                Найти
              </Button>
            </div>
          </div>

          {/* Quick filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Рестораны
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Автосервисы
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Медицина
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
              Красота
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-100 rounded-full mb-4">
                  <Icon name={stat.icon} size={24} className="text-secondary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="categories">Категории</TabsTrigger>
              <TabsTrigger value="top-companies">Топ компаний</TabsTrigger>
              <TabsTrigger value="recent">Новые компании</TabsTrigger>
            </TabsList>
            
            <TabsContent value="categories" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Все категории</h3>
                <p className="text-gray-600">Выберите нужную категорию для поиска компаний</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => handleCategoryClick(category)}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                            <Icon name={category.icon} size={24} className="text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{category.name}</CardTitle>
                            <Badge variant="secondary" className="text-xs">
                              {category.count} компаний
                            </Badge>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="top-companies" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Лучшие компании</h3>
                <p className="text-gray-600">Компании с самым высоким рейтингом пользователей</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className="text-xl">{company.name}</CardTitle>
                            {company.verified && (
                              <Icon name="CheckCircle" size={18} className="text-secondary" />
                            )}
                            {company.premium && (
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                Premium
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-primary font-medium mb-3">
                            {company.category}
                          </CardDescription>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-1">
                              {renderStars(company.rating)}
                              <span className="ml-2 font-semibold text-gray-900">{company.rating}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              {company.reviews} отзывов
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Icon name="MapPin" size={16} />
                              <span>{company.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="Phone" size={16} />
                              <span>{company.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="Phone" size={16} className="mr-2" />
                          Позвонить
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Icon name="MessageCircle" size={16} className="mr-2" />
                          Отзывы
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Новые компании</h3>
                <p className="text-gray-600">Недавно добавленные компании в каталог</p>
              </div>
              
              <div className="text-center py-12">
                <Icon name="Clock" size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Новые компании появятся здесь после модерации</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="MapPin" size={28} className="text-primary" />
                <div>
                  <h4 className="font-bold text-lg">Нижегородский</h4>
                  <p className="text-sm text-gray-400">Справочный портал</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Рейтинг надежных компаний Нижнего Новгорода с проверенными отзывами
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Компаниям</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Добавить компанию</a></li>
                <li><a href="#" className="hover:text-white">Тарифы</a></li>
                <li><a href="#" className="hover:text-white">Реклама</a></li>
                <li><a href="#" className="hover:text-white">Модерация</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Пользователям</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Как оставить отзыв</a></li>
                <li><a href="#" className="hover:text-white">Правила портала</a></li>
                <li><a href="#" className="hover:text-white">Часто задаваемые вопросы</a></li>
                <li><a href="#" className="hover:text-white">Поддержка</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Контакты</h5>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (831) 000-00-00</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>info@nnov-portal.ru</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>Нижний Новгород</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Нижегородский справочный портал. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;