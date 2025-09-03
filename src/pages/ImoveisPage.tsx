import React, { useState } from 'react';
import { Bed, Bath, Square, MapPin, ArrowRight, Shield, CreditCard, Zap, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import CreditCalculator from '../components/CreditCalculator';
import InteractiveMap from '../components/InteractiveMap';
import FAQ from '../components/FAQ';
import AnimatedSection from '../components/AnimatedSection';

interface ImoveisPageProps {
  onNavigate: (page: string) => void;
}

const ImoveisPage: React.FC<ImoveisPageProps> = ({ onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({});

  const nextImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (propertyId: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const properties = [
    {
      id: 1,
      title: "Empreendimento Vila Nova",
      description: "Empreendimento completamente murado, em pedra. O exterior das moradias terá uma grande presença de betão aparente, o que lhe configurará uma imagem de modernidade e simultaneamen...",
      bedrooms: 3,
      bathrooms: 3,
      area: 238,
      location: "Aldoar, Porto",
      images: [
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 2,
      title: "Empreendimento Noval Park",
      description: "Cidade de paisagens ofegantes, miragens autênticas de recantos e encantos irrefutáveis.Revela-se nobre na simbiose perfeita entre a opulência do seu património cultural e his...",
      bedrooms: 2,
      bathrooms: 2,
      area: 145,
      location: "Vila Nova de Gaia",
      images: [
        "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    },
    {
      id: 3,
      title: "Empreendimento Boss Gardens",
      description: "Boss Gardens está localizado na zona de Paranhos, uma das melhores zonas residenciais do Porto. Um projeto original que integra arquitetura vanguardista e designs de interiores surpreendent...",
      bedrooms: 3,
      bathrooms: 2,
      area: 139,
      location: "Paranhos, Porto",
      images: [
        "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
        "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800"
      ]
    }
  ];

  const services = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Alarmes",
      description: "Os alarmes são dispositivos de segurança projetados para alertar sobre eventos específicos, relacionados à segurança pessoal, propriedade. Desempenham um papel crucial na prevenção de incidentes indesejados e na proteção do seu lar.",
      link: "alarmes"
    },
    {
      icon: <CreditCard className="h-12 w-12 text-blue-600" />,
      title: "Crédito Habitação",
      description: "A Globalead é especializada em oferecer soluções de Crédito Habitação personalizadas, graças à sua relação privilegiada e poder negocial com as principais instituições bancárias em Portugal, garantindo as melhores opções para o seu agregado familiar.",
      link: "credito"
    },
    {
      icon: <Zap className="h-12 w-12 text-blue-600" />,
      title: "Certificação Energética",
      description: "O desempenho energético de um imóvel é classificado de A+ a G e deve ser indicado através de um certificado energético, obrigatório na venda. Com a Globalead, tratamos de todo o processo, garantindo todas as condições para a venda do seu imóvel.",
      link: "energia"
    },
    {
      icon: <FileText className="h-12 w-12 text-blue-600" />,
      title: "Seguros",
      description: "Um seguro é um contrato legal entre dois intervenientes e tem como objetivo fornecer proteção financeira ao segurado em caso de perdas ou danos. O segurado paga uma quantia e a seguradora fornece apoio financeiro conforme definido nas condições da apólice.",
      link: "seguros"
    }
  ];

  const newServices = [
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Obras e Remodelações",
      description: "Executamos obras e remodelações com profissionalismo, desde o planeamento até à entrega final. De pequenas melhorias a renovações completas, contamos com mão de obra especializada e experiente, adaptada às necessidades da sua casa ou espaço comercial.",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Design e Decoração",
      description: "Transformamos espaços com soluções personalizadas que aliam funcionalidade, elegância e design de excelência. Acompanhamos todas as etapas do planeamento à escolha do mobiliário e da decoração para garantir ambientes que refletem o seu estilo e respondem às suas necessidades.",
      image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Promotora Imobiliária",
      description: "Desenvolvemos empreendimentos inovadores que aliam design, funcionalidade e elevado potencial de valorização. Cada projeto é cuidadosamente planeado para oferecer uma experiência imobiliária distinta e rentável.",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Relocation",
      description: "Oferecemos um acompanhamento completo para garantir uma transição tranquila para Portugal. As nossas parcerias incluem a procura de imóvel, gestão documental e apoio na integração à comunidade local.",
      image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Arquitetura",
      description: "Criamos espaços intemporais onde luz, matéria e proporção se unem com simplicidade e autenticidade. Acreditamos que o verdadeiro luxo está na clareza das ideias e na honestidade dos materiais. Cada projeto reflete a identidade de quem o habita lugares serenos que resistem ao tempo e transcendem modas.",
      image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Apoio Jurídico",
      description: "Tratamos de todo o processo desde a autenticação de documentos e escrituras até à representação fiscal e pedidos de residência. Garantimos transparência e acompanhamento completo na compra, venda, arrendamento ou investimento imobiliário.",
      image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];

  const marketingFeatures = [
    "Apresentação do imóvel através de tours virtuais de alta qualidade, permitindo que potenciais compradores explorem a propriedade à distância.",
    "Reportagem de imagens e vídeos promocionais para destacar as melhores características do imóvel.",
    "Divulgação em zonas estratégicas para alcançar um público local relevante.",
    "Divulgação direcionada a uma carteira exclusiva de clientes qualificados e a grupos privados da Globalead Portugal.",
    "Promoção do imóvel em todas as plataformas sociais e digitais, com campanhas segmentadas e uma estratégia detalhada para maximizar a visibilidade.",
    "Publicação do imóvel nos principais portais imobiliários em Portugal e no estrangeiro, ampliando o alcance da sua oferta.",
    "Colocação de sinalética no local do imóvel para atrair potenciais compradores na área."
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          >
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f