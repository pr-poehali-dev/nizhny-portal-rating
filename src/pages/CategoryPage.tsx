import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface CategoryPageProps {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
}

const CategoryPage = ({ categoryId, categoryName, categoryIcon }: CategoryPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');
  const [districts, setDistricts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedRating, setSelectedRating] = useState<string[]>([]);

  const districtOptions = [
    'Автозаводский',
    'Канавинский', 
    'Ленинский',
    'Московский',
    'Нижегородский',
    'Приокский',
    'Советский',
    'Сормовский'
  ];

  const priceRanges = [
    { value: 'all', label: 'Любая цена' },
    { value: 'low', label: 'До 1000 ₽' },
    { value: 'medium', label: '1000-5000 ₽' },
    { value: 'high', label: '5000-15000 ₽' },
    { value: 'premium', label: 'От 15000 ₽' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'По рейтингу' },
    { value: 'reviews', label: 'По количеству отзывов' },
    { value: 'name', label: 'По алфавиту' },
    { value: 'distance', label: 'По расстоянию' },
    { value: 'price', label: 'По цене' }
  ];

  // Моковые данные компаний для категории
  const companies = [
    {
      id: 1,
      name: 'ООО "Медицинский центр Авиценна"',
      rating: 4.8,
      reviews: 247,
      address: 'ул. Большая Покровская, 15',
      phone: '+7 (831) 123-45-67',
      website: 'avicenna-nn.ru',
      workingHours: '8:00 - 20:00',
      priceRange: 'medium',
      district: 'Нижегородский',
      verified: true,
      premium: true,
      services: ['Терапия', 'Кардиология', 'Неврология', 'УЗИ'],
      description: 'Современный медицинский центр с опытными специалистами и новейшим оборудованием.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 2,
      name: 'Клиника "Здоровье плюс"',
      rating: 4.6,
      reviews: 189,
      address: 'пр. Гагарина, 45',
      phone: '+7 (831) 234-56-78',
      website: 'zdorovie-plus.ru',
      workingHours: '9:00 - 21:00',
      priceRange: 'high',
      district: 'Автозаводский',
      verified: true,
      premium: false,
      services: ['Хирургия', 'Гинекология', 'Педиатрия', 'Лабораторная диагностика'],
      description: 'Многопрофильная клиника с полным спектром медицинских услуг.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 3,
      name: 'Поликлиника "Семейный доктор"',
      rating: 4.7,
      reviews: 312,
      address: 'ул. Советская, 12',
      phone: '+7 (831) 345-67-89',
      website: 'family-doctor.ru',
      workingHours: '8:30 - 19:00',
      priceRange: 'medium',
      district: 'Советский',
      verified: true,
      premium: true,
      services: ['Семейная медицина', 'Вакцинация', 'Диспансеризация', 'Офтальмология'],
      description: 'Центр семейной медицины с индивидуальным подходом к каждому пациенту.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 4,
      name: 'Диагностический центр "Эксперт"',
      rating: 4.9,
      reviews: 156,
      address: 'ул. Минина, 34',
      phone: '+7 (831) 456-78-90',
      website: 'expert-diagnostic.ru',
      workingHours: '7:00 - 22:00',
      priceRange: 'high',
      district: 'Приокский',
      verified: true,
      premium: false,
      services: ['МРТ', 'КТ', 'Рентген', 'Маммография'],
      description: 'Современный диагностический центр с оборудованием экспертного класса.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 5,
      name: 'Стоматология "Белые зубы"',
      rating: 4.5,
      reviews: 98,
      address: 'ул. Горького, 67',
      phone: '+7 (831) 567-89-01',
      website: 'white-teeth.ru',
      workingHours: '9:00 - 20:00',
      priceRange: 'medium',
      district: 'Нижегородский',
      verified: false,
      premium: false,
      services: ['Терапевтическая стоматология', 'Хирургия', 'Ортопедия', 'Имплантация'],
      description: 'Стоматологическая клиника с безболезненным лечением и современными методиками.',
      image: '/api/placeholder/300/200'
    },
    {
      id: 6,
      name: 'Центр восстановительной медицины',
      rating: 4.4,
      reviews: 124,
      address: 'ул. Кулибина, 23',
      phone: '+7 (831) 678-90-12',
      website: 'recovery-center.ru',
      workingHours: '8:00 - 18:00',
      priceRange: 'low',
      district: 'Канавинский',
      verified: true,
      premium: false,
      services: ['Физиотерапия', 'Массаж', 'ЛФК', 'Реабилитация'],
      description: 'Специализированный центр восстановительной медицины и реабилитации.',
      image: '/api/placeholder/300/200'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={i} 
        name={i < Math.floor(rating) ? 'Star' : 'StarHalf'} 
        size={14} 
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} 
      />
    ));
  };

  const handleDistrictChange = (district: string, checked: boolean) => {
    if (checked) {
      setDistricts([...districts, district]);
    } else {
      setDistricts(districts.filter(d => d !== district));
    }
  };

  const handleRatingChange = (rating: string, checked: boolean) => {
    if (checked) {
      setSelectedRating([...selectedRating, rating]);
    } else {
      setSelectedRating(selectedRating.filter(r => r !== rating));
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDistrict = districts.length === 0 || districts.includes(company.district);
    const matchesPrice = priceRange === 'all' || company.priceRange === priceRange;
    const matchesRating = selectedRating.length === 0 || selectedRating.some(r => {
      const minRating = parseFloat(r);
      return company.rating >= minRating;
    });

    return matchesSearch && matchesDistrict && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <Icon name="ChevronLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Icon name={categoryIcon} size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
                  <p className="text-sm text-gray-600">{filteredCompanies.length} компаний найдено</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить компанию
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <Icon name="List" size={16} />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Icon name="Map" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Поиск</label>
                    <div className="relative">
                      <Input
                        placeholder="Поиск по названию или услуге"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                      <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <Separator />

                  {/* Districts */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Районы</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {districtOptions.map((district) => (
                        <div key={district} className="flex items-center space-x-2">
                          <Checkbox
                            id={district}
                            checked={districts.includes(district)}
                            onCheckedChange={(checked) => handleDistrictChange(district, checked as boolean)}
                          />
                          <label htmlFor={district} className="text-sm text-gray-700 cursor-pointer">
                            {district}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Ценовой диапазон</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Рейтинг</label>
                    <div className="space-y-2">
                      {['4.5', '4.0', '3.5', '3.0'].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox
                            id={`rating-${rating}`}
                            checked={selectedRating.includes(rating)}
                            onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700 cursor-pointer flex items-center">
                            От {rating}
                            <Icon name="Star" size={12} className="ml-1 text-yellow-400 fill-current" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Special filters */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Особые отметки</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="verified" />
                        <label htmlFor="verified" className="text-sm text-gray-700 cursor-pointer flex items-center">
                          <Icon name="CheckCircle" size={14} className="mr-1 text-secondary" />
                          Проверенные
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="premium" />
                        <label htmlFor="premium" className="text-sm text-gray-700 cursor-pointer flex items-center">
                          <Icon name="Crown" size={14} className="mr-1 text-yellow-500" />
                          Премиум
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Сортировать:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Показано {filteredCompanies.length} из {companies.length} компаний
              </div>
            </div>

            {viewMode === 'list' ? (
              /* List View */
              <div className="space-y-4">
                {filteredCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={company.image} 
                            alt={company.name}
                            className="w-full lg:w-48 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
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
                              
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center space-x-1">
                                  {renderStars(company.rating)}
                                  <span className="ml-2 font-semibold text-gray-900">{company.rating}</span>
                                </div>
                                <span className="text-sm text-gray-600">
                                  {company.reviews} отзывов
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {company.district}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{company.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <Icon name="MapPin" size={16} className="text-gray-400" />
                                <span>{company.address}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Icon name="Phone" size={16} className="text-gray-400" />
                                <span>{company.phone}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-sm">
                                <Icon name="Globe" size={16} className="text-gray-400" />
                                <span>{company.website}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <Icon name="Clock" size={16} className="text-gray-400" />
                                <span>{company.workingHours}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              {company.services.map((service, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1">
                              <Icon name="Phone" size={16} className="mr-2" />
                              Позвонить
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Icon name="MessageCircle" size={16} className="mr-2" />
                              Отзывы
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Icon name="MapPin" size={16} className="mr-2" />
                              На карте
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Map View */
              <Card className="h-96">
                <CardContent className="p-6 h-full">
                  <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="Map" size={48} className="text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Интерактивная карта</p>
                      <p className="text-sm text-gray-500 mt-2">
                        Здесь будет отображаться карта с компаниями категории "{categoryName}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-gray-600">
                Показано 1-{filteredCompanies.length} из {companies.length} результатов
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Icon name="ChevronLeft" size={16} />
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;