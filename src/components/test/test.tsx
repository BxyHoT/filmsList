import { useState } from "react";
import { Card, Pagination, Row, Col } from "antd";

const { Meta } = Card;

const data = [
  // Здесь вы можете добавить свои данные
  { title: "Card 1", description: "Description 1" },
  { title: "Card 2", description: "Description 2" },
  { title: "Card 3", description: "Description 3" },
  { title: "Card 4", description: "Description 4" },
  { title: "Card 5", description: "Description 5" },
  { title: "Card 6", description: "Description 6" },
  { title: "Card 7", description: "Description 1" },
  { title: "Card 8", description: "Description 2" },
  { title: "Card 8", description: "Description 3" },
  { title: "Card 4", description: "Description 4" },
  { title: "Card 5", description: "Description 5" },
  { title: "Card 6", description: "Description 6" },
  { title: "Card 10", description: "Description 1" },
  { title: "Card 2", description: "Description 2" },
  { title: "Card 3", description: "Description 3" },
  { title: "Card 4", description: "Description 4" },
  { title: "Card 5", description: "Description 5" },
  { title: "Card 6", description: "Description 6" },
  { title: "Card 100", description: "Description 1" },
  { title: "Card 2", description: "Description 2" },
  { title: "Card 3", description: "Description 3" },
  { title: "Card 4", description: "Description 4" },
  { title: "Card 5", description: "Description 5" },
  { title: "Card 6", description: "Description 6" },
  { title: "Card 1000", description: "Description 1" },
  { title: "Card 2", description: "Description 2" },
  { title: "Card 3", description: "Description 3" },
  { title: "Card 4", description: "Description 4" },
  { title: "Card 5", description: "Description 5" },
  { title: "Card 6", description: "Description 6" },
  // Добавьте больше карточек по необходимости
];

const ITEMS_PER_PAGE = 6;

const CardList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {currentItems.map((item, index) => (
          <Col span={12} key={index}>
            <Card hoverable>
              <Meta title={item.title} description={item.description} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        align="center"
        pageSize={ITEMS_PER_PAGE}
        total={data.length}
        onChange={handleChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default CardList;
